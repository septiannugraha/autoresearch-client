import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Research: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const [reports, setReports] = useState<string[]>([]);
    const [selectedReport, setSelectedReport] = useState('');
    const [reportContent, setReportContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchReports = async () => {
        setIsLoading(true);
        const response = await axios.get('/reports');
        setReports(response.data.result);
        setIsLoading(false);
    };

    const fetchReportContent = async (reportName: string) => {
        setIsLoading(true);
        const response = await axios.get(`/reports/${reportName}`);
        setReportContent(response.data.result);
        setIsLoading(false);
    };

    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleReportClick = (reportName: string) => {
        setSelectedReport(reportName);
        fetchReportContent(reportName);
    };

    const handleResearch = async () => {
        setIsLoading(true);
        await axios.post('/research', { keyword });
        fetchReports();
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">AutoResearch</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleKeywordChange}
                    className="border-2 border-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter a keyword"
                />
            </div>
            <button
                onClick={handleResearch}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Start Research
            </button>
            {isLoading && <p>Loading...</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2">Reports</h2>
                    {reports.map((report) => (
                        <p
                            key={report}
                            onClick={() => handleReportClick(report)}
                            className={`underline cursor-pointer ${report === selectedReport && "text-blue-500"}`}
                        >
                            {report}
                        </p>
                    ))}
                </div>
                <div className="border p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2">Report Content</h2>
                    <p>{reportContent}</p>
                </div>
            </div>
        </div>
    );
};

export default Research;
