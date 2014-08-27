# Die.ETS

This aims to be a simple words-killing app, dedicated to Chinese students
 learning English.

There may be future features to be added, but I will only address the first
 simple version here, as implementation spec.

Target words are splitted into different sets. Each word has its meaning.
 Users should be able to browse a set and take a test of it. The test is
 simple: a word is randomly selected and played using Speech Synthesis API.
 Then the user will answer whether he/she could recall this word. If user
 choose "Yes", the meaning of this word will appear for user to check whether
 he/she successfully recall the word. If user successfully recall the word,
 user will type this word, and if the text matches, he/she passes the word.

Once all words in the test are tested, the failed words will gather together,
 and a new section starts. The whole test will end when each word gets passed.
 The failed words (words shows up in the second section) will be automatically
 starred.

History of each test should be kept for future reivew.

Users could combine starred items in different sets. It is a logical set
 instead of a physical copy: for example, if sets #1, #2 and #3 are combined
 into a new logical set #123, all changes to starred items in #1 #2 #3 (add,
 delete, edit) will reflect in set #123.

Users need to put their data like this:

```
word
meaning
new line
next word
its meaning
EOF
```

to create or update a set.

Thanks Quizlet for inspiration.
