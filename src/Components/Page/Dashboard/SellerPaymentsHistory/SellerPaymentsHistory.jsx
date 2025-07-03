import React from 'react';
import useSellerPaymentsHistory from '../../../../hooks/useSellerPaymentsHistory';

const SellerPaymentsHistory = () => {
    const [paymentsHistory] = useSellerPaymentsHistory()
    return (
        <div>
            <h1 className="font-bold text-3xl mb-3">User All Payments History</h1>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">#</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Amount</th>
                        <th className="py-3 px-6 text-left">Transaction ID</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                    {paymentsHistory.map((payment, index) => (
                        <tr key={payment.transactionId} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6">{payment.email}</td>
                            <td className="py-3 px-6">${payment.price.toFixed(2)}</td>
                            <td className="py-3 px-6">{payment.transactionId}</td>
                            <td className="py-3 px-6">{new Date(payment.date).toLocaleDateString()}</td>
                            <td className="py-3 px-6">
                                <span
                                    className={`py-1 px-3 rounded-full text-xs font-semibold 
                      ${payment.status === "succeeded" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}
                                >
                                    {payment.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellerPaymentsHistory;