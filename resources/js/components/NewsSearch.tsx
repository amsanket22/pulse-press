import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-tailwindcss-select";
import { debounce, divide, update } from "lodash";
import { Article } from "../interfaces/Article";

const NewsSearch = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [results, setResults] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState<Array<Article>>(
        []
    );

    useEffect(() => {
        const articles = window.localStorage.getItem("articles");

        if (articles?.length) {
            setSelectedArticles(JSON.parse(articles));
        }
    }, []);

    const debouncedSearch = debounce(async (query) => {
        try {
            const response: AxiosResponse = await getArticles(query);
            const data = response.data.map((sections: Array<Article>) => {
                return {
                    label: sections[0].sectionName, // Assuming the pillarName is the label for the group
                    options: sections.map((item: Article) => {
                        return {
                            value: item.id,
                            label: item.title,
                            metadata: {
                                date: item.publicationDate,
                                url: item.url,
                                section: item.sectionName,
                            },
                        };
                    }),
                };
            });
            setResults(data);
        } catch (error) {
            console.log(error);
        }
    }, 300);

    const getArticles = (value) => {
        return axios.get(`/api/v1/search/guardian/${value}`);
    };

    const handleChange = (value) => {
        console.log("value:", value);
    };

    const handleSearchInputChange = (e) => {
        const { value } = e?.target;

        debouncedSearch(value);
    };

    const pinArticle = (data) => {
        const article = {
            title: data.label,
            publicationDate: data.metadata.date,
            sectionName: data.section,
            url: data.metadata.url,
            id: data.value,
        };
        const updatedArticles = [...selectedArticles, article];
        setSelectedArticles(updatedArticles);
        window.localStorage.setItem(
            "articles",
            JSON.stringify(updatedArticles)
        );
    };

    return (
        <div className="flex flex-col h-screen p-16 bg-red-200">
            <div className="flex justify-center">
                <div className="block w-1/4">
                    <Select
                        isSearchable
                        placeholder="Search Article"
                        primaryColor="blue"
                        value={selectedArticle}
                        onChange={handleChange}
                        onSearchInputChange={handleSearchInputChange}
                        options={results}
                        formatGroupLabel={(data) => (
                            <div
                                className={`py-2 text-xs flex items-center justify-between`}
                            >
                                <span className="font-bold">
                                    Section: {data.label}
                                </span>
                                <span className="bg-gray-200 h-5  p-1.5 flex items-center justify-center rounded-full">
                                    {data.options.length}
                                </span>
                            </div>
                        )}
                        formatOptionLabel={(data) => (
                            <li
                                className={`block transition duration-200 px-2 py-2 cursor-pointer select-none  rounded `}
                            >
                                <div className="flex flex-col">
                                    <div>
                                        <span className="font-bold">
                                            Title:{" "}
                                        </span>
                                        {data.label}
                                    </div>
                                    <div>
                                        <span className="font-bold">
                                            Publication Date:
                                        </span>{" "}
                                        {data.metadata.date}
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <a
                                                className="underline"
                                                target="_blank"
                                                href={data.metadata.url}
                                            >
                                                Link
                                            </a>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => pinArticle(data)}
                                                type="button"
                                                className="px-2 py-1 text-xs font-semibold text-white bg-indigo-600 rounded shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Pin the Article
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    />
                </div>
            </div>
            <div className="flow-root p-2 mt-8 bg-white rounded-md">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Link
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {selectedArticles.map((article, index) => (
                                    <tr key={index}>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {article.id}
                                        </td>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {article.title}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 ">
                                            <a
                                                target="_blank"
                                                className="font-semibold text-blue-400 underline"
                                                href={article.url}
                                            >
                                                Link
                                            </a>
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {article.sectionName}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {article.publicationDate}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            Remove
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsSearch;
