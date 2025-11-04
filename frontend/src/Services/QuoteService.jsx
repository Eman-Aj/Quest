
/* How the Quotes are formatted
{
	"q": "Lack of emotion causes lack of progress and lack of motivation.",
	"a": "Tony Robbins",
	"i": "https://zenquotes.io/img/tony-robbins.jpg",
	"c": "63",
	"h": "<blockquote>&ldquo;Lack of emotion causes lack of progress and lack of motivation.&rdquo; &mdash; <footer>Tony Robbins</footer></blockquote>"
}
*/

export default function NotificationService(){
    //Holds API info
    const quotesApiUrl = "https://api.allorigins.win/raw?url=https://zenquotes.io/api/quotes";

    // const [quotes, ]

    const getQuotes = async () => {
    
        const response = await fetch(quotesApiUrl);
        var data = await response.json()
        console.log(data)
        localStorage.setItem("Quotes", JSON.stringify(data))
        console.log("Added Quotes");
    
    }

    const getQuotess = () => {
    
    localStorage.setItem("Quotes", JSON.stringify({}))
    console.log("Added QUotes");
    
    }

    const removeQuotes = () => {
        localStorage.removeItem("Quotes")
        console.log("Quotes Removed");
        getQuotes()
        
    }

    if (localStorage.getItem("Quotes") === null || localStorage.getItem("Quotes") == {}) {
        getQuotes()
    } else {
        console.log("Quotes already added");
    }

    //Pick random quote

    return ({removeQuotes})
}