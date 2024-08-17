import React from "react";

function EmployeesUI() {
  return (
    <section class="mx-auto w-full max-w-7xl px-4 py-4">
      <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 class="text-lg font-semibold text-black">Employees</h2>
          <p class="mt-1 text-sm text-gray-700">
            This is a list of all employees. You can add new employees, edit or
            delete existing ones.
          </p>
        </div>
        <div>
          <button
            type="button"
            class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add new employee
          </button>
        </div>
      </div>
      <div class="mt-6 flex flex-col">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-gray-200 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      <span>Employee</span>
                    </th>
                    <th
                      scope="col"
                      class="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Role
                    </th>
                    <th scope="col" class="relative px-4 py-3.5">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr class="border-t border-gray-200">
                    <th
                      colSpan="5"
                      scope="col"
                      class="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-500"
                    >
                      Engineering
                    </th>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1160&amp;q=80"
                            alt=""
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 ">
                            John Doe
                          </div>
                          <div class="text-sm text-gray-500">
                            john@devui.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-12 py-4">
                      <div class="text-sm text-gray-900">
                        Front-end Developer
                      </div>
                      <div class="text-sm text-gray-500">Engineering</div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      Developer
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      <a href="#" class="text-gray-500">
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=928&amp;q=80"
                            alt=""
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 ">
                            Jane Doe
                          </div>
                          <div class="text-sm text-gray-500">
                            jane@devui.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-12 py-4">
                      <div class="text-sm text-gray-900">
                        Back-end Developer
                      </div>
                      <div class="text-sm text-gray-500">Engineering</div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      CTO
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      <a href="#" class="text-gray-500">
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr class="border-t border-gray-200">
                    <th
                      colSpan="5"
                      scope="col"
                      class="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-500"
                    >
                      Marketing
                    </th>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
                            alt=""
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 ">
                            Mark Doe
                          </div>
                          <div class="text-sm text-gray-500">
                            mark@devui.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-12 py-4">
                      <div class="text-sm text-gray-900">Digital Marketing</div>
                      <div class="text-sm text-gray-500">Marketing</div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      SEO Manager
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      <a href="#" class="text-gray-500">
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
                            alt=""
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900 ">
                            Seb Cook
                          </div>
                          <div class="text-sm text-gray-500">seb@devui.com</div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-12 py-4">
                      <div class="text-sm text-gray-900">Social Media</div>
                      <div class="text-sm text-gray-500">Marketing</div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      Social Media Manager
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      <a href="#" class="text-gray-500">
                        Edit
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between">
        <a
          href="#"
          class="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>previous</span>
        </a>
        <div class="hidden items-center gap-x-3 md:flex">
          <a href="#" class="rounded-md bg-gray-100 px-2 py-1 text-sm">
            1
          </a>
          <a
            href="#"
            class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            2
          </a>
          <a
            href="#"
            class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            3
          </a>
          <a
            href="#"
            class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            ...
          </a>
          <a
            href="#"
            class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            12
          </a>
          <a
            href="#"
            class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            13
          </a>
          <a
            href="#"
            class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            14
          </a>
        </div>
        <a
          href="#"
          class="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
}

export default EmployeesUI;
