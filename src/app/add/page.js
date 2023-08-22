"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
export default function Page() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  //   default date is today
  const today = new Date();

  const [date, setDate] = useState(today.toLocaleDateString("en-CA"));

  const addData = async (event) => {
    event.preventDefault();
    if (description === "") {
      alert("Please enter description");
      return;
    }
    if (amount === "") {
      alert("Please enter amount");
      return;
    }
    if (date === "") {
      alert("Please enter date");
      return;
    }
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        description,
        amount,
        date,
      }),
    });
    const res = await response.json();
    if (res.message === "Expense added sucessfully") {
      alert("Expense added sucessfully");
      // open the dashboard page
      redirect("/show");
      setDescription("");
      setAmount("");
    }
  };

  return (
    <main className="ml-0 md:ml-60 pt-16 max-h-screen overflow-auto">
      <div class="px-6 py-8">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-3xl p-8 mb-5">
            <h1 class="text-3xl font-bold mb-10">Add new Expense</h1>
            <div class="flex items-center justify-between">
              <div class="flex items-stretch">
                <div class="text-gray-400 text-xs">
                  Members
                  <br />
                  connected
                </div>
                <div class="h-100 border-l mx-4"></div>
                <div class="flex flex-nowrap -space-x-3">
                  <div class="h-9 w-9">
                    <img
                      class="object-cover w-full h-full rounded-full"
                      src="https://ui-avatars.com/api/?background=random"
                    />
                  </div>
                  <div class="h-9 w-9">
                    <img
                      class="object-cover w-full h-full rounded-full"
                      src="https://ui-avatars.com/api/?background=random"
                    />
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-x-2">
                <button
                  type="button"
                  class="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    class="bi bi-chat-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
                >
                  Open
                </button>
              </div>
            </div>

            <hr class="my-10" />

            <div class="gap-x-20">
              <div>
                <h2 class="text-2xl font-bold mb-4">Stats</h2>

                <div class=" gap-4">
                  <div class="col-span-4">
                    <div class="p-4 bg-purple-100 rounded-xl text-gray-800">
                      <div class="font-bold text-xl leading-none">
                        Add new Expense
                      </div>
                      <form class="mt-2">
                        <label class="block">
                          <span class="text-gray-700">Description</span>
                        </label>
                        <input
                          className="block mb-4 w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                          type="text"
                          name="description"
                          value={description}
                          required
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <label class="block">
                          <span class="text-gray-700">Amount</span>
                        </label>
                        <input
                          className="block mb-4 w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                          type="number"
                          name="amount"
                          value={amount}
                          required
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <label class="block">
                          <span class="text-gray-700">Date</span>
                        </label>
                        <input
                          className="block w-full mb-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                          type="date"
                          name="date"
                          value={date}
                          required
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <button
                          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={addData}
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
