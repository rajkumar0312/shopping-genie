# Shopping Genie Architecture — SG-01

## MVP
The MVP solves one problem:

> Compare price, stock and delivery for a product across major Indian shopping platforms, using the user's location where required.

## Explicitly deferred
- Card offers
- Minimum-cart discounts
- Coupon optimization
- AI assistant
- Universal cart
- Smart basket
- Price history

## Core pipeline

Search query
→ normalization
→ connector fan-out
→ normalized product candidates
→ product identity matching
→ location-aware availability
→ comparison/ranking
→ mobile response

## Design principle

Third-party platform integrations are adapters. The rest of the application must not depend on a platform's raw response shape.
