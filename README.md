# Inbox of Gregor Samsa (2022)

This is a [remake](https://inbox-of-gregor-samsa-2022.vercel.app) of a project I originally did in 2019 for an art class.

It all started because I was getting ready to apply to TikTok. I was looking over some of my stuff, and I realized, "_Yikes! The README for this project is still in unformatted plaintext!_" (2019 was a dark time. I had just learned Javascript in my art class. I had never heard of markdown.)

So I went into the repo and quickly fixed that. Phew, crisis averted. The fact that I wouldn't perceive markdown until my senior year in college would, henceforth, stay between me and God<sup>1</sup>.

However, in the process of doing this, I accidentally uncovered something that I had long forgotten about: the horrors of my early Javascript code. It's hard to articulate all the things that were wrong with it, so I'm just going to leave this bit here:

![image](https://user-images.githubusercontent.com/36776982/171504354-3bf1edf9-c538-4d70-99c5-d3f1cb9b7071.png)

Yea.

I wanted to fix this. I really did. But there is no salvation for an unreadable, 1000+ line long javascript file that uses `innerHTML` with this level of reckless abandon<sup>2</sup>.

And thus, this repository is my attempt to rewrite this entire project.

### Reasons why I used Svelte

1. It made my life easier.
2. I have been writing stuff in the Svelte framework for the past six months.

That's it.

The original 2019 project<sup>3</sup> was done using just HTML, CSS, and JS. And there is an argument to be made that redo-ing this project with the original tools would better highlight my technical improvements, but I have to say that if 2019!Jo knew Svelte, they absolutely would've used it. End of discussion.

This glowup is not perfect (probably both under and overengineered in parts, depending on where you look). But at least with this version, there's a chance I'll be able to make improvements to it three years down the line. Cheers.

---

<sup>1</sup> This is a joke. I'm an atheist.

<sup>2</sup> In my defense, this did not introduce any security vulnerabilities. After all, how could it when everything was hardcoded lmao. Using innerHTML like that is just ugly.

<sup>3</sup> The original is still up [here](https://jotawoah.neocities.org/Inbox/landing.html). I'm still very fond of it, but I'll let you judge it for yourself.
