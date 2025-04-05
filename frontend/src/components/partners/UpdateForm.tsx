import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  partnerSchema,
  type FormValues,
  searchSchema,
  type SearchValues,
} from "@/types/partner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { searchUser } from "@/utils/action";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { apiRequest } from "@/hooks/apiRequest";

const areas = [
  { id: "thane", label: "Thane" },
  { id: "sion", label: "Sion" },
  { id: "dombevli", label: "Dombevli" },
  { id: "kalyan", label: "Kalyan" },
  { id: "dadar", label: "Dadar" },
];

export default function UpdateForm() {
  const partners = useSelector((state: RootState) => state.partner.partners);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    success: boolean;
    message: string;
    user?: FormValues | null;
  } | null>(null);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Form for searching partners
  const searchForm = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for updating user details
  const updateForm = useForm<FormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: undefined,
      area: "",
      shift: {
        start: "",
        end: "",
      },
    },
  });

  async function onSearch(data: SearchValues) {
    setIsSearching(true);
    setSearchResult(null);
    setSubmitResult(null);

    try {
      const result = await searchUser(data, partners);
      setSearchResult(result);

      if (result.success && result.user) {
        // Reset the form with the user data
        updateForm.reset({
          ...result.user,
          phone: result.user.phone,
        });
      }
    } catch (error) {
      setSearchResult({
        success: false,
        message: "An error occurred during search",
        user: null,
      });
    } finally {
      setIsSearching(false);
    }
  }

  async function onUpdate(data: FormValues) {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      apiRequest(
        "http://localhost:3000/api/partner/" + data?.email,
        "PUT",
        data
      )
        .then((response) => {
          if (response.acknowledged)
            setSubmitResult({ success: true, message: "updated" });
          else {
            setSubmitResult({ success: false, message: "update failed" });
          }
        })
        .catch(() => {
          setSubmitResult({ success: false, message: "update failed" });
        });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "An error occurred during update",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForms() {
    searchForm.reset();
    updateForm.reset({
      name: "",
      email: "",
      password: "",
      phone: undefined,
      area: "",
      shift: {
        start: "",
        end: "",
      },
    });
    setSearchResult(null);
    setSubmitResult(null);
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Find User</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...searchForm}>
            <form
              onSubmit={searchForm.handleSubmit(onSearch)}
              className="space-y-4"
            >
              <FormField
                control={searchForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter user email to search"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-2">
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={resetForms}>
                  Reset
                </Button>
              </div>
            </form>
          </Form>

          {searchResult && (
            <Alert
              className={`mt-4 ${
                searchResult.success ? "bg-green-50" : "bg-red-50"
              }`}
              variant={searchResult.success ? "default" : "destructive"}
            >
              {searchResult.success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {searchResult.success ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{searchResult.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Update Form */}
      <Card
        className={
          searchResult?.success ? "" : "opacity-50 pointer-events-none"
        }
      >
        <CardHeader>
          <CardTitle className="text-2xl">Update User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...updateForm}>
            <form
              onSubmit={updateForm.handleSubmit(onUpdate)}
              className="space-y-6"
            >
              <FormField
                control={updateForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updateForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>Email cannot be changed</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updateForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updateForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(
                            e.target.value === "" ? undefined : e.target.value
                          );
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updateForm.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area to Work</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={updateForm.control}
                  name="shift.start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift Start</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="shift.end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift End</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {submitResult && (
                <Alert
                  className={submitResult.success ? "bg-green-50" : "bg-red-50"}
                  variant={submitResult.success ? "default" : "destructive"}
                >
                  {submitResult.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {submitResult.success ? "Success" : "Error"}
                  </AlertTitle>
                  <AlertDescription>{submitResult.message}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !searchResult?.success}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update User"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
