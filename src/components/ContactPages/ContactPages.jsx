import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function ContactPages() {
  const [user, setUser] = useState({
    email: "",
    phone: "",
    firstname: "",
    lastname: "",
    message: "",
  });

  const handilsubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://shiv-vibes.vercel.app/api/users/contact",
        { body: JSON.stringify({ user }) }
      );
      console.log("connection success: ", response.data);
      toast.success("thank you for connection", { duration: 3000 });
    } catch (error) {
      console.log("error: ", error.message);
      toast.error("connection error", { duration: 3000 });
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <div class="mx-auto max-w-7xl px-4">
          <div class="flex flex-col space-y-4 pt-6 md:pt-12">
            <div class="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3">
              <p class="text-center text-xs font-semibold leading-normal md:text-sm">
                Share your thoughts
              </p>
            </div>
            <p class="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
              Love to hear from you
            </p>
            <p class="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              veritatis voluptates neque itaque repudiandae sint, explicabo
              assumenda quam ratione placeat?
            </p>
          </div>
          <div class="mx-auto max-w-7xl py-4 md:py-6">
            <div class="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
              <div class="flex items-center justify-center">
                <div class="px-2 md:px-12">
                  <p class="text-2xl font-bold text-gray-900 md:text-4xl">
                    Get in touch
                  </p>
                  <p class="mt-4 text-lg text-gray-600">
                    Our friendly team would love to hear from you.
                  </p>
                  <form onSubmit={handilsubmit} class="mt-8 space-y-4">
                    <div class="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                      <div class="grid w-full  items-center gap-1.5">
                        <label
                          class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          for="first_name"
                        >
                          First Name
                        </label>
                        <input
                          class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          id="first_name"
                          value={user.firstname}
                          onChange={(e) =>
                            setUser({ ...user, firstname: e.target.value })
                          }
                          placeholder="First Name"
                        />
                      </div>
                      <div class="grid w-full  items-center gap-1.5">
                        <label
                          class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          for="last_name"
                        >
                          Last Name
                        </label>
                        <input
                          class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          id="last_name"
                          value={user.lastname}
                          onChange={(e) =>
                            setUser({ ...user, lastname: e.target.value })
                          }
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div class="grid w-full  items-center gap-1.5">
                      <label
                        class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="email"
                      >
                        Email
                      </label>
                      <input
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        placeholder="Email"
                      />
                    </div>
                    <div class="grid w-full  items-center gap-1.5">
                      <label
                        class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="phone_number"
                      >
                        Phone number
                      </label>
                      <input
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="tel"
                        id="phone_number"
                        value={user.phone}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                        placeholder="Phone number"
                      />
                    </div>
                    <div class="grid w-full  items-center gap-1.5">
                      <label
                        class="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="message"
                      >
                        Message
                      </label>
                      <textarea
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        id="message"
                        placeholder="Leave us a message"
                        value={user.message}
                        onChange={(e) =>
                          setUser({ ...user, message: e.target.value })
                        }
                        cols="3"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      class="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              <div class="h-full w-full image-container">
                <img
                  alt="Contact us"
                  class="mx-auto h-full w-full rounded-md object-cover zoom-image"
                  src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=687&amp;h=800&amp;q=80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPages;
