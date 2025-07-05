import React from 'react'
import Layout from '../components/Layout';
import Link from 'next/link';
import SpotifyEmbed from '../components/SpotifyEmbed';
import Carousel from '../components/Carousel';
import Vinyl from '../components/Vinyl';

const page = () => {
    return (
        <Layout>
        <h1 className="text-5xl font-bold"> about, abhishek </h1>
        <p className="mt-4">
          hey, i'm abhishek! most of my friends, including you, call me abhi (pronounced uhh-bhee).
        </p>
        <br></br>
        <h1 className="text-3xl font-bold">ok, so who are you?</h1>
        <p className="mt-4">
          i was born in delhi, india 🇮🇳 and have been living around the world. 
          currently, i reside in the us 🇺🇸 and am working as a software developer. 
        </p>
        <br></br>
        <p className="mt-4">
          i graduated with a bachelor's in cs and minor in spanish from <Link href="https://www.utdallas.edu/" className="text-orange-600 underline">utd</Link> in 2023.
          from 2023, i have been working at an ✈️ company and pursuing my masters. you can read up more in my <Link href="/resume" className="text-blue-300 underline">resume</Link>
        </p>
        <br></br>
        <p className="mt-4">
          more than that though, i am *deeply* passionate about ai in our society.
          i'm sure at this point, you've heard that thousands of times and by all means, i am no exception to that statement.
        </p>
        <br></br>
        <p className="mt-4">
          my experiences have emboldened to desire the democratization of the largest technological innovation in recent times.
          this involves both part and parcel of accelerationism and safety.
          currently, i am *devouring* information in how i can help good actors of ai have good actions.
        </p>
        <br></br>
        <h1 className="text-3xl font-bold">do you just code?</h1>
        <p className="mt-4">
          nah, i have a lot of hobbies.
          i am a big, big fan of nature 🌿 and love, love national parks :)
        </p>
        <br></br>
        <p className="mt-4">
          i'm currently training for a marathon 🏃🏽 and will be using my blog to document that process.
        </p>
        <br></br>
        <p className="mt-4">
          i am also deeply enchanted by the fine arts. music, novels, films - i devour it up!!
          you can always have me down to talk about philosphy, analyzing a movie, or looking behind the lines of a song.
        </p>
        <br></br>
      </Layout>
    );
}

export default page