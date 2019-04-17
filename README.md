# use-store

An opininated library for immutable yet simple state management using react hooks and typescript.

## Rationale

When looking at the most prominent state libraries available (Redux, MobX, MobX state tree) I was glad there were such amazing solutions for my problems, but they either: add too much boilerplate (Redux), do not provide great features such as time travelling and snapshots (MobX) or have their own type systems (MobX state tree).

This library aims to provide a simple, hook like interface on state logic by making use of react context and hooks. While providing the powerful benefits libraries such as redux can provide, by defining explicit, immutable actions.
