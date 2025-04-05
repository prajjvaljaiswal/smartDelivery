

import { updatePartner } from "@/store/partnerSlice"
import { type FormValues, partnerSchema, type SearchValues, searchSchema } from "@/types/partner"
import { Partner } from "@/types/types"
import { useDispatch } from "react-redux"

// Mock database of partners


export async function searchUser(data: SearchValues, partners: Partner[]) {
  const result = searchSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      message: "Invalid email format",
      user: null,
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = partners.find((user) => user.email === data.email)

  if (!user) {
    return {
      success: false,
      message: "User not found",
      user: null,
    }
  }

  // Convert `user` to match the expected `FormValues` shape
  const transformedUser: FormValues = {
    name: user.name,
    email: user.email,
    password: "", // leave blank or mask it
    phone: parseInt(user.phone.toString(), 10),
    area: user.area,
    shift: {
      start: user.shift?.start || "",
      end: user.shift?.end || "",
    },
  }

  return {
    success: true,
    message: "User found",
    user: transformedUser,
  }
}

export async function updateUser(data: FormValues, partners: Partner[]) {
  // Validate the data with Zod
  const dispatch = useDispatch()
  const result = partnerSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
    }
  }

  // In a real application, you would update the user in a database
  // For this example, we'll just simulate a successful update
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find the user index
  const userIndex = partners.findIndex((user) => user.email === data.email)

  if (userIndex !== -1) {
    // Update the user in our mock database
    // partners[userIndex] = data
    dispatch(updatePartner({index: userIndex, partner: {...data, phone: data.phone.toString(), status: partners[userIndex]?.status || "active"}}))
  }

  return {
    success: true,
    message: "User updated successfully!",
  }
}

export async function submitForm(data: FormValues) {
  // Validate the data with Zod
  const result = partnerSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
    }
  }

  // In a real application, you would save the data to a database
  // For this example, we'll just simulate a successful submission
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    message: "Form submitted successfully!",
  }
}

