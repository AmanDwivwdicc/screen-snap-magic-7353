# Saathi Avatar Upgrade and Career Journey Phases

## What will change

- Redesign Saathi as a young Indian mentor with a polished, semi-realistic anime-human look: detailed eyes, layered hair, softer facial shading, natural proportions, professional Indian clothing, and a more lifelike stage presence.
- Preserve the existing voice, chat, mood-tag, and saved-conversation behavior.
- Add expressive avatar phases for greeting/goodbye, attentive understanding, celebrating progress, and concern/guidance alongside listening, thinking, and speaking.
- Make transitions contextual: a gentle wave at the start, nodding while listening, hand-to-chin while thinking, natural talking gestures, a brief celebration reaction, and calm reassurance for difficult moments.
- Respect reduced-motion preferences and keep the avatar responsive across mobile and desktop.

## More CareerSaathi phases

- Add a simple journey navigator around the mentor experience: **Understand → Discover → Compare → Family → Decide**.
- Build the first additional experience, **Discover**, with career-fit cards that show role, earning potential, training path, local opportunity, and family-relevant facts.
- Add a **Compare** view for side-by-side career decisions, including income, job security, growth, education path, safety, and location fit.
- Add a **Family** discussion view that turns concerns into clear questions Saathi can discuss with the student and parent together.
- Keep unfinished later phases clearly marked without pretending they are functional.

## Technical details

- Keep the avatar component contract driven by `state` and `mood`, extending those types without changing chat persistence or the AI endpoint.
- Use a layered, detailed SVG/CSS character so expressions and gestures remain fast, private, and controllable without an external avatar service.
- Introduce small reusable career journey and comparison components, using the existing visual tokens and controls.
- Add unique page metadata for each new page and verify the main signed-in flow at desktop and mobile sizes.

## Validation

- Confirm every avatar phase renders and transitions without overlap.
- Confirm voice listening, thinking, speaking, and replay still drive Saathi correctly.
- Check the journey pages and comparisons on mobile and desktop.
- Verify the preview build and key interactions before completion.
