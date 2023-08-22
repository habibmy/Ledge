export default async function Page() {
  // get data from api and pass it to the page
  let rows = [];
  await fetch("http://localhost:3000/api")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      rows = data;
    });

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

            <div>
              <h2 class="text-2xl font-bold mb-4"> Expenses this month</h2>

              <div class="p-4 bg-purple-100 rounded-xl text-gray-800">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* display all rows */}
                    {rows.map((row) => (
                      <tr className="border-b border-purple-500">
                        <td>{row.description}</td>
                        <td>{row.amount}</td>
                        <td>{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
