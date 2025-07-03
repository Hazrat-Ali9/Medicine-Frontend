import React from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";

const PaymentsHistory = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxios();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  const handlePrint = (payment) => {
    const printContent = `
      <div>
        <h2>Payment Receipt</h2>
        <p><strong>Email:</strong> ${payment.email}</p>
        <p><strong>Amount:</strong> $${payment.price.toFixed(2)}</p>
        <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
        <p><strong>Date:</strong> ${new Date(payment.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${payment.status}</p>
      </div>
    `;
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <h1 className="font-bold text-3xl mb-3">Your All Payments History</h1>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Transaction ID</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {payments.map((payment, index) => (
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
              <td className="py-3 px-6">
                <button
                  onClick={() => handlePrint(payment)}
                  className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300"
                >
                  Print 🖨️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsHistory;
