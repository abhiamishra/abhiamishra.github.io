import Layout from "./components/Layout";
import Link from "next/link";
import SpotifyEmbed from "./components/SpotifyEmbed";

export default function Home() {
  return (
      <Layout>
      <h1 className="text-5xl font-bold"> abhi's workshop </h1>
      <p className="mt-4">
        welcome to the place where i reside, virtually.
      </p>
      <br></br>
      <p className="mt-4">
        this is my homepage, my workshop - a place where my ideas sit, my projects live, and where i like to explore my creativity.
      </p>
      <br></br>
      <p className="mt-4">
        currently, i am working as a software developer for an airlines company working on artificial intelligence.
      </p>
      <br></br>
      <p>
        along with that, i'm doing my masters of cs at <Link href="https://omscs.gatech.edu/" className="text-yellow-600 underline">georgia tech</Link> with a specialization of ml.
      </p>
      <br></br>
  

      <main className="mt-4">
        <h1 className="text-2xl font-bold mb-6">Currently tinkering with 🔨💻</h1>
        <p>
          i'm currently taking <Link href="https://omscs.gatech.edu/cs-7641-machine-learning" className="text-yellow-600 underline">cs 7641: machine learning</Link> in my spring semester.
        </p>
        <br></br>
        <p>
          on my own time, i've been really interested in applying and researching into applied ai. 
          
          my current flavor is reproducing applied ai papers in an effort to gain understanding and allow others to use it - enterprise or hobbyists.
          
          some of my current side projects include reproducing <Link href="https://github.com/abhiamishra/ace-repro" className="text-yellow-600 underline">the ACE paper</Link> and GEPA.
        </p>
      </main>
      <br></br>
      <main className="mt-4">
        <h1 className="text-2xl font-bold">current fav track:</h1>
          <SpotifyEmbed/>
      </main>
      
      {/* <main className="mt-4">
          <h1 className="text-2xl font-bold">carousel:</h1>
          <Carousel data={imageData} ></Carousel>
        </main> */}
    </Layout>
  );
}
