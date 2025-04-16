import bong from "../assets/bong.gif"

const Tip = ({ results }) => {
    const hasNonEnglishMovie = results.some(movie => movie.original_language !== 'en');

    return (
        <>
            {hasNonEnglishMovie && (
                <aside className='flex flex-col py-1 items-center fixed bottom-1/4 lg:-bottom-1 right-0 lg:-right-1 text-xs lg:text-sm text-gray-700 cursor-default text-center bg-white max-w-28 lg:max-w-60 border-1 font-display'>
                    <p>Remember, a wise man once said...</p>
                    <img src={bong} alt="Subtitle Tip" className="max-w-full" />
                    <p>"Once you overcome the 1-inch-tall barrier of subtitles, you will be introduced to so many more amazing films."</p>
                </aside>
            )}
        </>
    );
};

export default Tip;