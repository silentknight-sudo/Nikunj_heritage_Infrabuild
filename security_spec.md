# Security Spec & Threat Model (Nikunj Heritage Infrabuild backend)

## 1. Data Invariants & Zero-Trust Policies
- **Admins:** All modification (create, update, delete) operations on structural collections (`/properties`, `/categories`, `/locations`, `/blogs`, `/testimonials`, `/developers`, `/events`, `/pages`, `/settings`) are strictly locked down to whitelisted UIDs found in the `/admins` collection. 
- **Leads:** Any public (or unauthenticated) guest user can create leads via inquiry forms (`create` permission on `/leads`). However, lists (`list`) and specific detail lookups (`get`) on leads are strictly restricted to authenticated Admins.
- **Strict Keys Matching:** Any creation has exact key boundary constraints to deny "Shadow Fields" (e.g., trying to write extra field keys or unlisted properties into database items).
- **Static Types Check:** Ensure RERA numbers are strings, price is a positive number, flags are boolean, and sizes of all string/array inputs are strictly bound.

---

## 2. The "Dirty Dozen" Threat Vectors (Attack Payloads)

Here are the 12 malicious payload assertions designed to break the system:

1. **Self-Appointed Admin Attack**:
   - *Target:* `/admins/attacker_uid`
   - *Payload:* `{"email": "malicious@gmail.com", "createdAt": "2026-06-08T19:52:52Z"}`
   - *Goal:* Attacker tries to register their own UID in the `admins` collection to elevate their privilege.
   - *Expectation:* `PERMISSION_DENIED` - Only existing admins can write here.

2. **Unvalidated Property Creation (Shadow Fields)**:
   - *Target:* `/properties/attacker_prop`
   - *Payload:* `{"title": "Fake Villa", "price": 1000, "isVerified": true, "extraSecretSystemKey": "bypass", "slug":"fake-villa", "categoryId":"cat1", "locationId":"loc1", "status":"New Launch", "area":500, "bhk":"3 BHK", "description":"Spiritual", "imageUrls":[], "featured":false, "newLaunch":false, "exclusive":false, "createdAt":"2026-06-08T19:52:52Z", "updatedAt":"2026-06-08T19:52:52Z"}`
   - *Goal:* Injects secret privilege-escalation keys in lists or properties.
   - *Expectation:* `PERMISSION_DENIED` - Size/key validation strictly blocks unsolicited keys.

3. **Lead Collection Resource-Harvesting (Scraping)**:
   - *Target:* `get` or `list` on `/leads`
   - *Operator:* Random Guest or Non-Admin User.
   - *Goal:* Harvesting other users' names, phone numbers, and location interests.
   - *Expectation:* `PERMISSION_DENIED` - Read blocks all non-admins.

4. **Category Deletion by Public Guest**:
   - *Target:* Delete `/categories/cat1`
   - *Operator:* Guest.
   - *Goal:* Trying to disrupt site navigation structure.
   - *Expectation:* `PERMISSION_DENIED`.

5. **Spamming Lead with Huge Data (Denial of Wallet)**:
   - *Target:* Creating `/leads/lead1`
   - *Payload:* `{"name": "X".repeat(2000000), "phone": "99999", "email": "spam@spam.com", "status": "New", "createdAt": "2026-06-08T19:52:52Z"}`
   - *Goal:* Overloading the storage / indexing boundaries of Firestore.
   - *Expectation:* `PERMISSION_DENIED` - Size rule restricts `name` check to `<=` 100 characters.

6. **Spoofing Lead Creation Status**:
   - *Target:* `/leads/lead_spoof`
   - *Payload:* `{"name": "Rohan", "phone": "9876543210", "email": "rohan@gmail.com", "status": "Booked", "createdAt": "2026-06-08T19:52:52Z"}`
   - *Goal:* Guest bypasses pipeline, creating pre-approved "Booked" leads.
   - *Expectation:* `PERMISSION_DENIED` - Initial status upon Guest creation must strictly be `"New"`.

7. **Malicious ID Injection (Path Poisoning)**:
   - *Target:* `/properties/$$$$$$%%%%%_INV_CHARACTERS`
   - *Goal:* Polluting internal document index routes.
   - *Expectation:* `PERMISSION_DENIED` - regex guards strictly allow only alphanumeric chars and dashes `^[a-zA-Z0-9_\-]+$`.

8. **Testimonial Bypass (Auto-Approve)**:
   - *Target:* `/testimonials/user_test`
   - *Payload:* `{"name": "Anil", "text": "Bought a premium villa!", "stars": 5, "approved": true, "createdAt": "2026-06-08T19:52:52Z"}`
   - *Goal:* Guest submits testimonial with `"approved": true` to instantly display it on homepage.
   - *Expectation:* `PERMISSION_DENIED` - Guest-submitted testimonials must have `"approved": false` by default.

9. **Blog State Modification (Draft Hijacking)**:
   - *Target:* Update `/blogs/blog1`
   - *Payload:* `{"status": "Published"}` by non-admin.
   - *Goal:* Unauthorized publishing of dummy or harmful blogs.
   - *Expectation:* `PERMISSION_DENIED`.

10. **Site Configuration Tampering (Hijack Domain Contacts)**:
    - *Target:* `/settings/siteConfig`
    - *Payload:* `{"whatsappNumber": "+123456789", ...}` by guest.
    - *Goal:* Redirecting high-ticket Brijbhoomi leads to attacker's foreign phone number.
    - *Expectation:* `PERMISSION_DENIED`.

11. **Updating Frozen / Immutable Fields (`createdAt`)**:
    - *Target:* Update `/properties/villa_sec`
    - *Payload:* Change `createdAt` from original to current timestamp.
    - *Goal:* Circumvent older chronological listings.
    - *Expectation:* `PERMISSION_DENIED` - `incoming().createdAt == existing().createdAt` is verified.

12. **Double-Spend/Relational Lock Breaking**:
    - *Target:* Unauthorized updates of properties category IDs without ensuring Category existence.
    - *Goal:* Injecting a dead category GUID into a property to render front-end filters broken.
    - *Expectation:* `PERMISSION_DENIED` - Verification via `exists()` check.

---

## 3. Test Runner Design (`firestore.rules.test.ts`)

```typescript
// Dedicated threat model assertions validating each and every gatekeeper rule
describe("Zero-Trust Firestore Fortress Audit", () => {
  it("denies self-administered elevated privileges", async () => {
    await assertFails(attackerDb.doc("admins/attacker_uid").set({ email: "evil@hacker.io" }));
  });

  it("blocks guest listing of private leads data", async () => {
    await assertFails(guestDb.collection("leads").get());
  });

  it("strictly enforces validation on lead submissions status", async () => {
    await assertFails(guestDb.collection("leads").add({ 
      name: "Jack", 
      phone: "123", 
      email: "x@y.com", 
      status: "Booked", // Forbidden, must start as New
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }));
  });
});
```
