1. I kept the current text and its statistics in React state inside the
CharacterCounter component. Whenever the input changes, its callback sends the
new text to the parent. The parent updates the text and recalculates the
character count, word count, and reading-time estimate right away, so the input
and statistics stay in sync.

2. I used an estimate of 200 words per minute, a simple average that makes sense
for a small writing tool. I round up to a whole minute so even a short, non-empty
text has a one-minute estimate, while empty text stays at zero. It is an
estimate, of course; actual reading speed varies from person to person.

3. The calculations run directly in the input-change handler and are kept
lightweight. In particular, word counting scans for groups of non-whitespace
characters instead of building extra arrays with `split` and `filter`. React
updates the controlled input and statistics together, and I avoided adding
delays or asynchronous work that could make the displayed values lag behind
what someone is typing.

4. The trickiest part was defining what should count as a word. Splitting on
whitespace can create empty entries for blank text or repeated spaces, so I
count non-whitespace groups instead. That naturally handles empty and
whitespace-only input, as well as line breaks. I also made sure the reading-time
calculation handles zero words separately, rather than reporting a minute for
an empty input.
