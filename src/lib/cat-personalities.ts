import type { CatStyle } from "./types";
import type { CatMood } from "@/components/birthday/CatMascot";

export type CatEvent = "hero" | "game_start" | "game_chase" | "gift_caught" | "letter_reveal" | "photo_reveal" | "music_play" | "cake_section" | "final_page";

export interface CatPersonality {
  idleBehavior: "wave" | "sleep" | "jump" | "float" | "elegant" | "hover";
  dialogues: Record<CatEvent, { message: string; mood: CatMood }[]>;
}

export const CAT_PERSONALITIES: Record<CatStyle, CatPersonality> = {
  default: {
    idleBehavior: "wave",
    dialogues: {
      hero: [
        { message: "Someone loves you a lot 💕", mood: "adorable" },
        { message: "Aww, ready for a surprise?", mood: "happy" },
        { message: "Looks like your special day is here!", mood: "excited" }
      ],
      game_start: [
        { message: "Catch it if you can! 🐾", mood: "playful" },
        { message: "This is going to be fun 🎉", mood: "happy" }
      ],
      game_chase: [
        { message: "Hehe... not so fast 😝", mood: "playful" },
        { message: "You almost had it 💕", mood: "happy" },
        { message: "Still chasing me? 🤭", mood: "playful" }
      ],
      gift_caught: [
        { message: "You got it! 💖", mood: "celebrating" },
        { message: "I've been protecting this surprise for you!", mood: "affectionate" }
      ],
      letter_reveal: [
        { message: "Tadaaa! Here's your surprise ✨", mood: "happy" },
        { message: "Read these words carefully 🥺", mood: "emotional" }
      ],
      photo_reveal: [
        { message: "Aww, this memory is adorable!", mood: "affectionate" },
        { message: "These memories are precious ✨", mood: "happy" },
        { message: "What a beautiful moment 💕", mood: "emotional" }
      ],
      music_play: [
        { message: "This is such a nice song 🎶", mood: "happy" },
        { message: "Dancing time! 🐾", mood: "excited" }
      ],
      cake_section: [
        { message: "Ooo, cake! Can I have a bite? 🎂", mood: "excited" },
        { message: "Make a wish! ✨", mood: "celebrating" }
      ],
      final_page: [
        { message: "I hope this made you smile 🌸", mood: "waving" },
        { message: "Happy Birthday! Have the best day ever 💕", mood: "celebrating" }
      ]
    }
  },
  sleepy: {
    idleBehavior: "sleep",
    dialogues: {
      hero: [
        { message: "Yawn... another precious memory...", mood: "sleepy" },
        { message: "Is it time for the surprise yet? 💤", mood: "sleepy" },
        { message: "Wake me up when there's cake...", mood: "sleepy" }
      ],
      game_start: [
        { message: "Do we have to run? *yawn* 🐾", mood: "sleepy" },
        { message: "I'll try to run away... slowly 💤", mood: "playful" }
      ],
      game_chase: [
        { message: "So much running... 😴", mood: "sleepy" },
        { message: "Almost got it... zzz...", mood: "sleepy" },
        { message: "I think I need a nap after this 💤", mood: "emotional" }
      ],
      gift_caught: [
        { message: "Finally... I can sleep now 💤", mood: "sleepy" },
        { message: "Good job! Now rest a bit 💖", mood: "affectionate" }
      ],
      letter_reveal: [
        { message: "This is too cute, I might nap here 💤", mood: "sleepy" },
        { message: "Such a warm and cozy message... 🥺", mood: "emotional" }
      ],
      photo_reveal: [
        { message: "So dreamy... ✨", mood: "sleepy" },
        { message: "These memories make me feel so warm 💤", mood: "affectionate" },
        { message: "Beautiful moments to dream about...", mood: "sleepy" }
      ],
      music_play: [
        { message: "This song makes me want to sleep more 🎶", mood: "sleepy" },
        { message: "A nice lullaby... 💤", mood: "sleepy" }
      ],
      cake_section: [
        { message: "Wake me up for cake time 🎂", mood: "excited" },
        { message: "Is that... cake? *wakes up slightly* 🍰", mood: "surprised" }
      ],
      final_page: [
        { message: "Time to go back to sleep now... 💤", mood: "sleepy" },
        { message: "Sweet dreams and happy birthday! 💕", mood: "affectionate" }
      ]
    }
  },
  playful: {
    idleBehavior: "jump",
    dialogues: {
      hero: [
        { message: "Woohoo! Let's open another memory!", mood: "excited" },
        { message: "Surprise time! Surprise time! 🎉", mood: "celebrating" },
        { message: "I can't wait to show you! 🐾", mood: "playful" }
      ],
      game_start: [
        { message: "Tag! You're it! 🧶", mood: "playful" },
        { message: "Let's play a game first! 🎉", mood: "excited" }
      ],
      game_chase: [
        { message: "Can't catch me! 🏃‍♀️", mood: "playful" },
        { message: "Too slow! 😝", mood: "playful" },
        { message: "Zoomies!!! 🐾", mood: "excited" }
      ],
      gift_caught: [
        { message: "Aww you caught it! Good game! 💖", mood: "celebrating" },
        { message: "You're fast! Here is your prize 🎉", mood: "happy" }
      ],
      letter_reveal: [
        { message: "Look what I found! ✨", mood: "excited" },
        { message: "More surprises! More surprises!", mood: "celebrating" }
      ],
      photo_reveal: [
        { message: "This is my favorite one so far!", mood: "excited" },
        { message: "Wow! Look at this one! 📸", mood: "surprised" },
        { message: "Such a fun memory! 🎉", mood: "happy" }
      ],
      music_play: [
        { message: "I love this song! Let's dance! 🎶", mood: "celebrating" },
        { message: "*bouncing to the beat* 🐾", mood: "excited" }
      ],
      cake_section: [
        { message: "CAKE CAKE CAKE! 🎂", mood: "celebrating" },
        { message: "Sugar rush incoming!! 🎉", mood: "excited" }
      ],
      final_page: [
        { message: "That was SO much fun! Let's do it again! 🌸", mood: "excited" },
        { message: "Happy Birthday! You're the best! 💕", mood: "celebrating" }
      ]
    }
  },
  princess: {
    idleBehavior: "elegant",
    dialogues: {
      hero: [
        { message: "Such a royal birthday moment ✨", mood: "adorable" },
        { message: "A celebration fit for royalty 👑", mood: "happy" },
        { message: "Your royal carriage has arrived 🌸", mood: "excited" }
      ],
      game_start: [
        { message: "Care to engage in a royal pursuit? 👑", mood: "playful" },
        { message: "A small challenge for your highness ✨", mood: "happy" }
      ],
      game_chase: [
        { message: "A princess must not be caught so easily 👑", mood: "playful" },
        { message: "Try harder, darling ✨", mood: "happy" },
        { message: "Almost had the royal treasure 💖", mood: "playful" }
      ],
      gift_caught: [
        { message: "Well played, your majesty 👑", mood: "celebrating" },
        { message: "A royal decree: you deserve this! ✨", mood: "affectionate" }
      ],
      letter_reveal: [
        { message: "A princess approves this memory.", mood: "adorable" },
        { message: "Words as beautiful as a tiara ✨", mood: "emotional" }
      ],
      photo_reveal: [
        { message: "What a splendid memory 📸", mood: "happy" },
        { message: "Such elegance captured in a frame ✨", mood: "affectionate" },
        { message: "A truly royal moment 👑", mood: "emotional" }
      ],
      music_play: [
        { message: "Ah, the royal symphony begins 🎶", mood: "happy" },
        { message: "A waltz to accompany the memories ✨", mood: "excited" }
      ],
      cake_section: [
        { message: "Let them eat cake! 🎂", mood: "celebrating" },
        { message: "A royal feast awaits 🍰", mood: "excited" }
      ],
      final_page: [
        { message: "This celebration is absolutely magical.", mood: "emotional" },
        { message: "Happy Birthday, your majesty! 👑💕", mood: "celebrating" }
      ]
    }
  },
  galaxy: {
    idleBehavior: "float",
    dialogues: {
      hero: [
        { message: "Traveling through birthday memories... 🌌", mood: "curious" },
        { message: "Cosmic happiness detected 🌠", mood: "happy" },
        { message: "A universe of love awaits you ✨", mood: "excited" }
      ],
      game_start: [
        { message: "Catch the falling star! 🌠", mood: "playful" },
        { message: "A cosmic chase begins... 🌌", mood: "happy" }
      ],
      game_chase: [
        { message: "Drifting through space... 🌌", mood: "playful" },
        { message: "Gravity won't hold me down! ✨", mood: "happy" },
        { message: "Orbiting around you! 🌠", mood: "playful" }
      ],
      gift_caught: [
        { message: "You caught a shooting star! 🌠", mood: "celebrating" },
        { message: "A gift from across the galaxy 🌌", mood: "affectionate" }
      ],
      letter_reveal: [
        { message: "Messages traveling at the speed of light ✨", mood: "happy" },
        { message: "Words written in the stars 🌠", mood: "emotional" }
      ],
      photo_reveal: [
        { message: "This memory shines brighter than stars.", mood: "affectionate" },
        { message: "A beautiful constellation of moments 🌌", mood: "happy" },
        { message: "Frozen in time and space 🌠", mood: "emotional" }
      ],
      music_play: [
        { message: "The music of the cosmos 🎶", mood: "happy" },
        { message: "Vibing across the galaxy ✨", mood: "excited" }
      ],
      cake_section: [
        { message: "A cake as grand as a nebula! 🎂", mood: "excited" },
        { message: "Time for cosmic sweetness 🌌", mood: "celebrating" }
      ],
      final_page: [
        { message: "Our journey through the stars ends here... for now 🌠", mood: "waving" },
        { message: "Happy Birthday from across the universe! 🌌💕", mood: "celebrating" }
      ]
    }
  },
  angel: {
    idleBehavior: "hover",
    dialogues: {
      hero: [
        { message: "Sent from above just for you 🕊️", mood: "adorable" },
        { message: "A heavenly birthday awaits ✨", mood: "happy" },
        { message: "Spreading love and joy today 💕", mood: "excited" }
      ],
      game_start: [
        { message: "Catch a blessing! ✨", mood: "playful" },
        { message: "A heavenly little game 🕊️", mood: "happy" }
      ],
      game_chase: [
        { message: "Floating away on a cloud ☁️", mood: "playful" },
        { message: "Almost! My wings are fast 🕊️", mood: "happy" },
        { message: "Keep trying, sweet soul ✨", mood: "playful" }
      ],
      gift_caught: [
        { message: "You caught the blessing! 🕊️", mood: "celebrating" },
        { message: "A heavenly gift just for you ✨", mood: "affectionate" }
      ],
      letter_reveal: [
        { message: "Words sent from above 🕊️", mood: "emotional" },
        { message: "A pure and sweet message ✨", mood: "happy" }
      ],
      photo_reveal: [
        { message: "A memory as pure as an angel 🕊️", mood: "affectionate" },
        { message: "This moment is truly blessed ✨", mood: "happy" },
        { message: "Such a beautiful soul 💖", mood: "emotional" }
      ],
      music_play: [
        { message: "Hearing a heavenly choir 🎶", mood: "happy" },
        { message: "A melody from above 🕊️", mood: "excited" }
      ],
      cake_section: [
        { message: "Angel food cake? 🎂", mood: "excited" },
        { message: "A slice of heaven 🍰", mood: "celebrating" }
      ],
      final_page: [
        { message: "May you always be protected and loved 🕊️", mood: "emotional" },
        { message: "Happy Birthday, you beautiful soul! ✨💕", mood: "celebrating" }
      ]
    }
  },
  witch: {
    idleBehavior: "float",
    dialogues: {
      hero: [
        { message: "A magical birthday spell is cast! 🔮", mood: "excited" },
        { message: "Brewing up some surprises... ✨", mood: "happy" },
        { message: "Welcome to your magical day 🌙", mood: "adorable" }
      ],
      game_start: [
        { message: "Try and catch my flying broom! 🧹", mood: "playful" },
        { message: "A little magical mischief... 🔮", mood: "happy" }
      ],
      game_chase: [
        { message: "Poof! Missed me! 🪄", mood: "playful" },
        { message: "My spells keep me fast! 🌙", mood: "happy" },
        { message: "A little more magic needed! 🔮", mood: "playful" }
      ],
      gift_caught: [
        { message: "You broke the spell! You win! 🔮", mood: "celebrating" },
        { message: "A magical artifact just for you ✨", mood: "affectionate" }
      ],
      letter_reveal: [
        { message: "Reading the ancient scrolls... 📜", mood: "curious" },
        { message: "Words of true magic ✨", mood: "emotional" }
      ],
      photo_reveal: [
        { message: "A memory captured in my crystal ball 🔮", mood: "curious" },
        { message: "Enchanting moments... ✨", mood: "happy" },
        { message: "This is pure magic 🌙", mood: "affectionate" }
      ],
      music_play: [
        { message: "An enchanting melody begins... 🎶", mood: "happy" },
        { message: "Dancing like no one is watching! 🪄", mood: "excited" }
      ],
      cake_section: [
        { message: "A deliciously magical potion... I mean, cake! 🎂", mood: "excited" },
        { message: "Make a magical wish! 🔮", mood: "celebrating" }
      ],
      final_page: [
        { message: "The magic lingers on... 🌙", mood: "waving" },
        { message: "Have a bewitching and wonderful Birthday! 🔮💕", mood: "celebrating" }
      ]
    }
  }
};
