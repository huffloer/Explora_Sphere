import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import AdminCalendar from "../Components/AdminCalendar";
import { usePage } from "@inertiajs/react";

export default function Calendar({ auth }) {
    const { data } = usePage().props;
    const [requests, setRequests] = useState({});

    useEffect(() => {
        // Transform the data into the desired format
        const formattedRequests = data.reduce((acc, request) => {
            const date = request.created_at.split("T")[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push({
                id: request.id,
                type: request.request_type,
                author: request.document_author,
                title: request.document_title,
                description: request.description,
                status: request.status,
                url: request.document_url,
                // Add more attributes as needed
            });
            return acc;
        }, {});
    
        setRequests(formattedRequests);
    }, [data]);
    
    const handleAccept = (date) => {
        const dateString = date.toISOString().split("T")[0];
        alert(`Accepted request on ${dateString}`);
        // Update state to mark the request as accepted (if needed)
        setRequests((prevRequests) => {
            const updatedRequests = { ...prevRequests };
            delete updatedRequests[dateString];
            return updatedRequests;
        });
    };

    const handleReject = (date) => {
        const dateString = date.toISOString().split("T")[0];
        alert(`Rejected request on ${dateString}`);
        // Update state to mark the request as rejected (if needed)
        setRequests((prevRequests) => {
            const updatedRequests = { ...prevRequests };
            delete updatedRequests[dateString];
            return updatedRequests;
        });
    };

    console.log(requests);

    return (
        <AdminLayout auth={auth}>
            <AdminCalendar
                requests={requests}
                onAccept={handleAccept}
                onReject={handleReject}
            />
        </AdminLayout>
    );
}

// const [requests, setRequests] = useState({
//   // "2024-01-15": [
//   //   { title: "Request 1", status: "En attente" },
//   //   { title: "Request 2", status: "Acceptée" },
//   // ],
//   // "2024-02-20": [
//   //   { title: "Request 3", status: "Refusée" },
//   // ],
//   // "2024-03-06":[
//   //   { title: "Demande", status: "Refusée" }
//   // ],
//   // "2024-03-10": [
//   //   { title: "Demande", status: "En attente" },
//   //   { title: "Article", status: "Publié" },
//   // ],
//   // Add more requests as needed
// });
