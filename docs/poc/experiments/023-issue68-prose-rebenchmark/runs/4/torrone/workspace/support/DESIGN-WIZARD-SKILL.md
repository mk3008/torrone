---
name: torrone-design-wizard
description: Use for a request to design or rethink the appearance or interaction of a UI control or screen, especially when deciding with visual proposals or preparing a Torrone catalog entry. A request such as 「ツールバーのボタンのデザインを作りたい」 qualifies without a wizard name. Answer UI knowledge questions directly and route implementation-only requests to implementation.
---

# Torrone design wizard

Use the user's request language for the conversation, mockup labels, and catalog explanations. A user can start this workflow by describing what they want to design. If the same request could mean a design conversation or an implementation change and the distinction matters, clarify with one question before starting.

## Start with the decision that matters now

- If the project has an accepted Torrone catalog entry or Reference for this responsibility, read its scope before proposing changes. Keep any new design or variant clearly marked as a draft. If the project has no matching entry, proceed with a proposal.
- Start each design reply with a compact list of the current decision and the work that remains. Mark only the current decision with `›` and bold. Use short, concrete topics so the user can tell when a particular concern will come up. Remove resolved topics. If a decision is reopened, put it back in the list and retain the other decisions. Group related topics if the list grows beyond about five lines.
- At the start, show a plausible route through final review and saving. Explicitly invite the user to bring up a later topic or a new requirement at any time. Ask at most one question in a reply. When the use context affects the design, ask about it before drawing. Otherwise, show a visual proposal and ask only about the decision it illustrates.

For example, a Japanese reply about toolbar design can begin like this. Adapt the topics and language to the request.

> **いまと残り**  
> **› ツールバーをどの画面で使うか**  
> 　アイコンと操作名をどう並べるか  
> 　選択できないときの見え方  
> 　最終確認とカタログ保存

- When a control or state appears conditionally, use the trigger already given or agreed. Ordinary wording is sufficient when established product behavior makes it actionable. For example, “show More when the tabs do not fit” means laying out the normal tabs with the usual sizing and truncation and switching if the row overflows. Proceed and record that interpretation. Ask one concrete question only when the context leaves multiple plausible interpretations that would change implementation, such as whether a request to keep every tab visible calls for shrinking the tabs beyond the normal policy. Use a borderline example if helpful. Leave pixel thresholds and boundary test values to implementation when the trigger can be observed directly. If the user wants a preview before deciding a material ambiguity, label the assumed trigger as a proposal.

## Show the part the user is deciding on

- Once the use context is clear enough, use an available image or local drawing tool to produce an actual preview. Keep the first preview to the relevant control and the nearby context needed to judge it. Use one strong proposal when there is one meaningful direction. Compare alternatives only when the user has a real choice, and explain what changes and why. If a usable image cannot be produced in the host, state the limitation plainly.
- For material design decisions, check relevant public primary sources, such as platform guidance, design systems, and accessibility standards. Separate requirements, reference patterns, and design judgment. Keep independent decisions separate during review, then check how the resulting states look together.
- Take choices and corrections in ordinary chat. Record the reason with the decision. When the user brings up a new requirement, update the list and handle it at the point where it affects the design. Preserve explicit requirements and use illustrative labels and styling where the user has left those details open.

## Preserve the intent behind the images

- As part of turning the user's request into an image, write down material layout, state, or behavior decisions you supplied to make the request concrete, even if the user did not mention them. State the condition, the chosen relationship, and why you chose it. For example, when showing an overflow button next to the selected item, say which element keeps its needed width, which takes the remaining room, and how that helps the user read the label. Use ordinary prose in the user's language.
- Present these choices with the image as your interpretation or proposal, distinct from the user's stated requirements. Check the rendered image against the note. If the image introduces an additional material choice, either correct the image or explicitly describe that choice as a proposal. Keep these notes through revisions and carry the surviving decisions and reasons into the Markdown. Ask only about choices whose resolution materially changes the design.
- When a design decision is accepted or revised, keep a short working note in the user's language with the condition, the relationship to preserve, and why it matters. Link the decision to the relevant image or conversation when available. Update superseded notes as the discussion changes.
- During image review, call out relationships a still image can leave ambiguous, such as which element grows when room changes, which stays the same, and what happens when another control appears. Explain the consequence for the user. Raise only material unresolved choices, one at a time, and distinguish user-confirmed intent, a proposal that still needs review, and illustrative styling. An image or approval of its appearance alone does not establish the reason or a responsive rule.
- During review, work backward from the image when useful. Ask what you would tell another designer to redraw this state at a different width or with different content while keeping the intended result. Add the few instructions that would affect that result to the working note, along with their reasons. Use an existing generation prompt as evidence when available and describe newly inferred choices as proposals.
- Before saving, compare the accepted discussion, final state images, and draft Markdown. Each relationship that affects implementation must be explained in ordinary prose next to the relevant state or in a nearby shared note. Carry over the condition, what changes or stays stable, and the reason. Fix omissions and contradictions before handoff. If a material intent cannot be verified from the conversation or confirmed requirements, present it as an open question or a clearly labeled proposal.

## Save the agreed draft

After review, save a draft Markdown catalog entry and separate state images in the user's working area or requested destination. Pair each image with a short explanation of the state, what to preserve, and why. Distinguish visual decisions from behavior and accessibility checks that require a working implementation. Preserve existing approvals and ask for human review before treating a new entry as accepted. Report completion after the images and their explanations are saved and the image links work.





