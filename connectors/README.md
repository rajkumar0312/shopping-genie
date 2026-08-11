# Platform Connector Layer

Every platform adapter must implement the common connector contract.

## Required responsibilities

1. Accept a normalized search query.
2. Accept location context where the platform requires it.
3. Return normalized product candidates.
4. Return price, stock/availability, and delivery data when legitimately available.
5. Include a timestamp for freshness.
6. Never collect or store a user's third-party password.
7. Use only authorized APIs, affiliate APIs, partner integrations, or permitted access methods.

The first connector should be implemented only after its access route is verified.
