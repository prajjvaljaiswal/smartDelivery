
import { type FormValues, partnerSchema, type SearchValues, searchSchema } from "@/types/partner"

// Mock database of users
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone: 1234567890,
    area: "sion",
    shift: {
      start: "09:00",
      end: "17:00",
    },
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "securepass",
    phone: 9876543210,
    area: "thane",
    shift: {
      start: "10:00",
      end: "18:00",
    },
  },
]

export async function searchUser(data: SearchValues) {
  // Validate the search data
  const result = searchSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      message: "Invalid email format",
      user: null,
    }
  }

  // Simulate a database lookup
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = users.find((user) => user.email === data.email)

  if (!user) {
    return {
      success: false,
      message: "User not found",
      user: null,
    }
  }

  return {
    success: true,
    message: "User found",
    user,
  }
}

export async function updateUser(data: FormValues) {
  // Validate the data with Zod
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
  const userIndex = users.findIndex((user) => user.email === data.email)

  if (userIndex !== -1) {
    // Update the user in our mock database
    users[userIndex] = data
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

