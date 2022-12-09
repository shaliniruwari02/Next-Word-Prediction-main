# Next-Word-Prediction

https://user-images.githubusercontent.com/71334027/175220311-d5d91b66-a511-41e6-a2db-fcff30d2017a.mp4


# Methodology 

### Predicting the next word has been an important technique for better communication for more than a decade. Traditional systems used word frequency lists to complete the words already spelled out by the user. The implementation involves using a large corpus. The methods used are as follows: 

## 1. Counting words in Corpora:
Counting of things in NLP is based on a corpus. NLTK (Natural Language Toolkit) provides a diverse set 
of corpora. For our project we'll be using the Brown corpus. The Brown corpus is a 1-million-word 
collection of samples from 500 written texts from different genres (newspaper, novels, non-fiction etc.). 
There are tasks such as spelling error detection, word prediction for which the location of the punctuation is 
important.The application counts punctuation as words.

## 2. N-Grams Models: 
Let’s begin with the task of computing P(w|h), the probability of a word w given some history h. Suppose 
the history h is “its water is so transparent that” and we want to know the probability that the next word is 
the: 
   ####                              P (the|its water is so transparent that)   ----------------  (3.1) 
 
One way to estimate this probability is from relative frequency counts: take a very large corpus, count the 
number of times we see its water is so transparent that, and count the number of times this is followed by 
the. This would be answering the question “Out of the times we saw the history h, how many times was it 
followed by the word w”, as follows: 
 
####                                 P (the|its water is so transparent that) =  C(its water is so transparent that the) / (its water is so transparent that)  ---------   (3.2)  
 
 With a large enough corpus, such as the web, we can compute these counts and estimate the probability 
from Eq. 3.2. 
we wanted to know the joint probability of an entire sequence of words like its water is so transparent, we 
could do it by asking “out of all possible sequences of five words, how many of them are its water is so 
transparent?” We would have to get the count of its water is so transparent and divide by the sum of the 
counts of all possible five-word sequences. Now how can we compute probabilities of entire sequences like 
P(w1,w2,...,wn)? One thing we can do is decompose this probability using the chain rule of probability: 

![image](https://user-images.githubusercontent.com/71334027/175220697-e893f399-55c9-4e44-94f8-f6f22b8105ae.png)

The chain rule shows the link between computing the joint probability of a sequence and computing the 
conditional probability of a word given previous words. Equation 3.4 suggests that we could estimate the 
joint probability of an entire sequence of words by multiplying together a number of conditional 
probabilities. 

- Bigram Model:
##### In this model the probability of a word is approximated by given all the previous words by the conditional probability of the preceding word. For a bigram, we compute the probability of a complete string. To calculate the probability, from this corpus we take the count of a particular bigram, and divide this count by the sum of all the bigrams that share the same first word. 

- Trigram Model:
##### A trigram-model looks just same as a bigram model, except that we condition on the two-previous words.

## 3. Minimum Edit distance: 
The distance between two string is a measure of how alike two strings are to each other. The minimum 
edit distance between two strings is the minimum number of editing operations (insertion, deletion, 
substitution) needed to transform one string into another. 

![image](https://user-images.githubusercontent.com/71334027/175221187-d2740ee9-75ed-478c-9e36-2afd5857f23b.png)

Minimum edit distance is used in the correction of spelling mistakes or OCR errors, and approximate 
string matching, where the objective is to find matches for short strings in many longer texts. 


