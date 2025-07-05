import React from 'react'
import Layout from '../components/Layout'
import Vinyl from '../components/Vinyl'
import InfiniteShelf, { InfiniteShelfType } from '../components/InfiniteShelf'

const page = () => {
    const bookList: InfiniteShelfType[] = [
        { id: 1, src: "/stranger.jpg"},
        { id: 2, src: "/gdsmthing.jpg"},
        { id: 3, src: "/mansearch.jpg"},
        { id: 4, src: "/alchemist.jpeg"},
        { id: 5, src: "/mos.jpg"},
    ];

    return (
        <Layout>
            <h1 className="text-5xl font-bold">
                abhi's library
            </h1>
            <p className='mt-4'>
                this is my digital library. this will consist of my favorite songs, vinyls, novels, blogs, books, etc, etc. 
            </p>
            <br></br>
            <p>
                this is not to be a board of culture - just a digital vault that i think people would benefit from :).
            </p>
            <br></br>
            <h3 className="text-2xl font-bold">current favorite vinyls</h3>
            <main className="flex items-center justify-center flex-wrap gap-10">
                <div className="relative w-full flex justify-center gap-8 py-16">
                    <div className="absolute left-0 right-0 bottom-1/5 h-[4px] bg-gray-400 opacity-100 z-1" />
                    <div className="flex gap-8 z-10">
                        <Vinyl vinylName="beesgees.png"></Vinyl>
                        <Vinyl vinylName="cmiygl.jpg"></Vinyl>
                        <Vinyl vinylName="flowerboy.webp"></Vinyl>
                    </div>
                </div>
            </main>

            <h3 className="text-2xl font-bold">bookshelf</h3>
            <main className="flex items-center justify-center flex-wrap gap-10">
                <div className="relative w-full flex justify-center gap-8 py-16">
                    <div className="absolute left-0 right-0 bottom-1/5 h-[4px] bg-gray-400 opacity-100 z-1" />
                    <div className="flex gap-8 z-10">
                    {/* <Book bookName="stranger.jpg"></Book>
                    <Book bookName="gdsmthing.jpg"></Book>
                    <Book bookName="mansearch.jpg"></Book> */}
                    <InfiniteShelf objects={bookList} />
                    </div>
                </div>
            </main>
        </Layout>
      )
}

export default page