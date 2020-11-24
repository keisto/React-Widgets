import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = () => {
    const [term, setTerm] = useState('Tesla') // Optional could start with empty string
    const [debouncedTerm, setDebouncedTerm] = useState(term)
    const [results, setResults] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(term)
        }, 500)

        // Invoked second-time around
        return () => {
            clearTimeout(timer)
        }
    }, [term])

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get(
                'https://en.wikipedia.org/w/api.php',
                {
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format: 'json',
                        srsearch: debouncedTerm,
                    },
                }
            )
            setResults(data.query.search)
        }
        if (debouncedTerm) {
            search()
        }
    }, [debouncedTerm])

    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="content">
                    <div className="right floated content">
                        <a
                            className="ui button"
                            href={`https://en.wikipedia.org?curid=${result.pageid}`}
                        >
                            Visit
                        </a>
                    </div>
                    <div className="header">{result.title}</div>
                    <span
                        dangerouslySetInnerHTML={{ __html: result.snippet }}
                    ></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label htmlFor="search">Enter Search Term</label>
                    <input
                        className="input"
                        type="text"
                        id="search"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    )
}

export default Search
