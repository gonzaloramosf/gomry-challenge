"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/services/Users";
import { useUser } from "@/stores/UserContext";
import { useToast } from "@/stores/ToastContext";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Select from "@/components/Select";

const COUNTRIES = [
  { label: "Argentina", value: "Argentina", path: "/ar.png", alt: "Argentina" },
  { label: "Italy", value: "Italy", path: "/it.png", alt: "Italy" },
  { label: "United States", value: "United States", path: "/us.png", alt: "United States" },
  { label: "Uruguay", value: "Uruguay", path: "/uy.png", alt: "Uruguay" }
];

function Kyc() {
  const router = useRouter();
  const toast = useToast();
  const { user, userIsLoading, refreshUser } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [governmentId, setGovernmentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName:    "",
    lastName:     "",
    dateOfBirth:  "",
    country:      "",
    fullAddress:  "",
    governmentId: "",
  });

  function clearError(field: keyof typeof errors): void {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate(): boolean {
    const dobTrimmed = dateOfBirth.trim();

    const newErrors = {
      firstName:    firstName.trim()    ? "" : "First name is required.",
      lastName:     lastName.trim()     ? "" : "Last name is required.",
      dateOfBirth:  !dobTrimmed
        ? "Date of birth is required."
        : isNaN(Date.parse(dobTrimmed))
          ? "Please enter a valid date."
          : "",
      fullAddress:  fullAddress.trim()  ? "" : "Full address is required.",
      governmentId: governmentId.trim() ? "" : "Government ID is required.",
      country:
        !country
          ? "Please select a country."
          : country === "Uruguay"
            ? "This country is not supported."
            : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).some(Boolean);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user || isLoading) return;

    const hasErrors = validate();
    if (hasErrors) return;

    try {
      setIsLoading(true);

      const updatePromise = updateUser(user.uid, {
        firstName,
        lastName,
        country,
        fullAddress,
        governmentId,
        dateOfBirth,
      });

      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 200));
      await Promise.all([updatePromise, minimumDelay]);

      await refreshUser();

      router.replace("/account");
      router.refresh();

    } catch (err) {
      toast.show({
        type: "error",
        title: "KYC submission failed",
        message: "Please verify your connection and try again.",
      })
      console.error(err);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-blue-950 bg-[url('/pattern.png')] bg-no-repeat bg-contain bg-center">
      <div className="bg-white mt-24 mb-8 sm:my-auto mx-auto md:w-full md:max-w-md rounded-2xl shadow-md">
        <h2 className="w-10/12 mt-8 mx-auto text-center text-2xl/9 font-bold tracking-tight text-gray-600">
          Complete verification process
        </h2>

        <form onSubmit={handleSubmit} className="m-8 space-y-4" noValidate>
          <div className="sm:flex sm:flex-row justify-between sm:space-x-4">
            <Input
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                clearError("firstName")
              }}
              errorMessage={errors.firstName}
            />

            <div className="mt-4 sm:mt-0">
              <Input
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                  clearError("lastName")
                }}
                errorMessage={errors.lastName}
              />
            </div>
          </div>

          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value)
              clearError("dateOfBirth")
            }}
            errorMessage={errors.dateOfBirth}
          />

          <Select
            label="Country"
            options={COUNTRIES}
            value={country}
            onChange={(value) => {
              setCountry(value)
              clearError("country")
            }}
            errorMessage={errors.country}
          />

          <Input
            label="Full Address"
            type="text"
            value={fullAddress}
            onChange={(e) => {
              setFullAddress(e.target.value)
              clearError("fullAddress")
            }}
            errorMessage={errors.fullAddress}
          />

          <Input
            label="Government ID"
            type="text"
            value={governmentId}
            onChange={(e) => {
              setGovernmentId(e.target.value)
              clearError("governmentId")
            }}
            errorMessage={errors.governmentId}
          />

          <Button
            styles={{ size: "full", color: "blue", rounded: "xxl" }}
            isLoading={isLoading}
            disabled={isLoading || userIsLoading}
            className="mt-4"
          >
            Confirm
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Kyc;
