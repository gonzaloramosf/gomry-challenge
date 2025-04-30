"use client"

import React from "react"
import { useUser } from "@/stores/UserContext"
import { LoaderCircle } from "lucide-react"

function format(v: unknown): React.ReactNode {
  if (typeof v === "boolean") return v ? "Yes" : "No"
  if (typeof v === "string" || typeof v === "number") return v
  return "-"
}

export default function Account() {
  const { user, userIsLoading } = useUser()

  if (userIsLoading || !user) {
    return (
      <div className="bg-white h-screen w-full flex justify-center pt-28">
        <LoaderCircle className="animate-spin text-blue-500 size-10" />
      </div>
    )
  }

  return (
    <div className="bg-white h-screen w-full">
      <div className="container mx-auto max-w-7xl px-2 sm:px-10 lg:px-12">
        <header className="pt-24 px-4 sm:px-0">
          <h3 className="text-base/7 font-bold text-gray-900">Account</h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
            Personal details.
          </p>
        </header>

        <dl className="mt-6 divide-y divide-gray-100 border-t border-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 odd:bg-gray-50">
            <dt className="sm:ms-2 text-sm/6 font-semibold text-gray-900">First Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(user.firstName)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 odd:bg-white">
            <dt className="sm:ms-2 text-sm/6 font-semibold text-gray-900">Last Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(user.lastName)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 odd:bg-gray-50">
            <dt className="sm:ms-2 text-sm/6 font-semibold text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(user.email)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 odd:bg-white">
            <dt className="sm:ms-2 text-sm/6 font-semibold text-gray-900">Date of Birth</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(user.dateOfBirth)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 odd:bg-gray-50">
            <dt className="sm:ms-2 text-sm/6 font-semibold text-gray-900">Country</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(user.country)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 odd:bg-white">
            <dt className="sm:ms-2 text-sm/6 font-semibold text-gray-900">Full Address</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(user.fullAddress)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 odd:bg-gray-50">
            <dt className="sm:ms-2 text-sm/6 font-semibold text-gray-900">Government ID</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(user.governmentId)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 odd:bg-white">
            <dt className="sm:ms-2 text-sm/6 font-semibold text-gray-900">Completed KYC</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(user.completedKyc)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
