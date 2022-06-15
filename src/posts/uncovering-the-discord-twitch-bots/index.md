---
title: Uncovering the Discord Twitch Bots
published: 2020-03-31T19:54:07.456+00:00
---

So a few days ago my friend Slip got a DM on Discord from this "Twitch" bot asking him to invite it to my servers as well as to join theirs. The message the bot said claimed that Discord and Twitch had partnered up to give its users free Nitro Games and free Twitch Prime.

![Twitch partnership scam dm](https://i.matdoes.dev/NWRDK)
It obviously looked fake, so Slip created a testing server and added me and some friends to help. Upon joining, the fake Twitch bot DMed everyone in the server with the same message as it sent to Slip. It looked like some sort of social engineering worm, but it hadn't done anything bad yet, so we revoked the bot's perms and left it in the server.

![Free nitro scam dm](https://i.matdoes.dev/YZBAZ)
When I joined the server it linked, it looked like some sort of bad giveaway server with giveaway channels, and even a rules and TOS channel. Unfortunately for us, there were no channels that we could talk in to inform other people. Soon after joining, we got another DM from a different bot but with the same name. Again, it contained a link to join a Discord server. However, this time, instead of saying it was from Twitch, it took a more straightforward attempt, saying to join for "Nitro / Nudes".

It was getting late, so we went to sleep. When we woke up, we were greeted by at least 4 other bots with the same message and name, so we just invited all of them to our server! The old bots were now offline and for some people, the bots' names were displayed as things such as "thisisaspambot", "Fake Twitch Bot", and "Fake bot". We later found out that this was in fact a doing of the Discord Trust and Safety team, but they didn't do it very well because some of the bots could still DM people, and it didn't always show up with their new names.

![Scam bot list, new names](https://i.matdoes.dev/IJBSL)

Another interesting thing was in a MediaFire link one of the bots DMed to Slip. He shared it with us, and the file claimed to be an executable containing a Nitro generator, but it looked obviously fake, evident by the instructions text file provided.

![Free nitro download DM](https://i.matdoes.dev/PVZUR)

```
How to use the Discord Generator :

1. Disable anti-virus, and open it.
2. When you opened it, press on ''Generate'' and good luck!
3. It says its a virus because this generator generates accounts, so obviously it will say its a virus, but its not.

If its not working, it means u dont have the good version.
Good Luck!
```

> What even is that grammar...

Another notable thing was that when we searched up the owner of the "Free Nitro" Discord server on YouTube, it returned their channel. One of the videos was a free Nitro generator, leading to the same exact MediaFire link, so we knew there was a definite link with that user.

Anyway, we booted up Windows Sandbox and ran the virus with a process monitor in the background. There were a bunch of references to Python, so it was likely a Python script compiled into an exe.

![Process monitor](https://i.matdoes.dev/60O9N)

I wasn't sure what it was compiled with, so I tried running unpy2exe on it, but it returned an error telling me to use pyinstxtractor instead, as it was compiled with pyinstaller. After we ran pyinstxtractor on the exe, it returned a folder with a bunch of pyc and pyd (Python bytecode) files.

![PyInstxtractor](https://i.matdoes.dev/QTWOT)

![Created on March 2nd](https://i.matdoes.dev/YOYVJ)

> It looks like it was created on March 2nd.

No matter what we tried, we couldn't decompile it into normal readable Python, so we just analyzed the bytecode using the [dis](https://docs.python.org/3/library/dis.html) Python module. There was a bunch of references to tokens and browser LocalStorage, where the token is stored. The malware also sent an http request to [api.ipify.org](https://api.ipify.org) (to grab the victim's IP address), the user's email and phone number, as well as the user's nitro status.

There was also a funky looking base64 string, which revealed to be a Discord webhook that the script sent the user's details to.

Once we got hold of the webhook, things got spicy.

We tidied up the testing server a bit and hid our discussion channels, then made the invite look as appealing as possible.

![Who wouldn't click that?](https://i.matdoes.dev/D81ZG)

Using a little webhook spamming script I wrote, we spammed @everyone, as well as an invite to our server, and left it running overnight.

In the morning, We woke up to this:
![They joined!](https://i.matdoes.dev/TAA6M)

They were the admins to that free Nitro server.

We also found out that they had deleted their webhook, which meant we couldn't spam them anymore, but they wouldn't get the tokens of any new users.

The first two quickly left, but one sent us a message before leaving.

!["wtf are you"](https://i.matdoes.dev/VJMW9)

We asked kzh to join back again.

![Asking them to rejoin](https://i.matdoes.dev/GHAII)

This led to this hilarious conversation.

![1](https://i.matdoes.dev/30HD2)
![2](https://i.matdoes.dev/9VJX1)
![3](https://i.matdoes.dev/TYQBO)
![4](https://i.matdoes.dev/MRIU1)

In summary, these guys are just terrible clowns trying to get tokens from unsuspecting Discord members.

And that ends the tale. We still have the server ID and the channel ID that the webhook was created in as well as the discord tags of all the members and we'll continue to spam any future webhooks that the Twitch bots send us.

:)
