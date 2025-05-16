import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authStore } from "@/store/authStore";
import { Edit2, Loader, Loader2, Plus, Trash2,  } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addressStore } from "@/store/addressStore";

const ProfileDetails = () => {
    const [edit, setEdit] = useState("");
  const [data, setData] = useState("");
  const [addressData, setAddressData] = useState({
    id: "",
    address: "",
    appartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const { user, updateUserName, updateUserEmail } = authStore();
  const { createAddress, addressloading, address, deleteAddress } =
    addressStore();

  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = (id) => {
    setDeleteId(id);
    deleteAddress(id);
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleAddress = async (e) => {
    e.preventDefault();
    await createAddress(addressData);
    setAddressData({
      id: "",
      address: "",
      appartment: "",
      city: "",
      postalCode: "",
      phone: "",
    });
    setDialogOpen(false);
  };
  return (
    <>
    <div className="pt-8 flex flex-col gap-8 border-b pb-10">
            <Card className={"py-6 bg-card/30"}>
              <CardContent>
                <span className="text-gray-500 text-sm">Name</span>
                <div className="flex items-center gap-3">
                  {edit === user.name ? (
                    <Input
                      type="text"
                      className={"w-fit"}
                      value={data}
                      onFocus={() => setData(user.name)}
                      onChange={(e) => setData(e.target.value)}
                      onBlur={() => {
                        updateUserName(user._id, data);
                        setEdit("");
                      }}
                    />
                  ) : (
                    <p>{user.name}</p>
                  )}
                  <Edit2
                    className="size-4 text-primary cursor-pointer p-0"
                    onClick={() => {
                      setEdit(edit === user.name ? "" : user.name);
                      setData(user.name);
                    }}
                  />
                </div>
                <div className="pt-4">
                  <span className="text-gray-500 text-sm">Email</span>
                  <div className="flex items-center gap-3">
                    {edit === user.email ? (
                      <Input
                        type="email"
                        className={"w-fit"}
                        value={data}
                        onFocus={() => setData(user.email)}
                        onChange={(e) => setData(e.target.value)}
                        onBlur={() => {
                          updateUserEmail(user._id, data);
                          setEdit("");
                        }}
                      />
                    ) : (
                      <p>{user.email}</p>
                    )}
                    <Edit2
                      className="size-4 text-primary cursor-pointer p-0"
                      onClick={() => {
                        setEdit(edit === user.email ? "" : user.email);
                        setData(user.email);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className={"py-6 bg-card/30"}>
              <CardContent>
                <div className="flex items-center gap-6 pb-3">
                  <span className="text-gray-500 text-sm">Addresses</span>
                  <span
                    className="flex items-center text-primary text-sm cursor-pointer"
                    onClick={() => {
                      setAddressData({
                        address: "",
                        appartment: "",
                        city: "",
                        postalCode: "",
                        phone: "",
                      });
                      setDialogOpen(true);
                    }}
                  >
                    <Plus className="size-4 p-0" /> Add
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {address.length === 0 ? (
                    <span className="text-gray-500 text-sm">
                      No address added yet
                    </span>
                  ) : (
                    address?.map((address, index) => (
                      <Card key={address._id} className={"m-0 rounded-sm p-1"}>
                        <CardContent className={"p-1"}>
                          {["Default Address", "2nd Address", "3rd Address"][
                            index
                          ] && (
                            <div className="flex items-center justify-between">
                              <span className="text-primary text-sm">
                                {
                                  [
                                    "Default Address",
                                    "2nd Address",
                                    "3rd Address",
                                  ][index]
                                }
                              </span>
                              <div className="flex gap-2">
                                <Button
                                  className="flex items-center size-6 cursor-pointer"
                                  variant={"outline"}
                                  onClick={() => {
                                    handleDelete(address._id);
                                  }}
                                  disabled={addressloading}
                                >
                                  {deleteId === address._id ? (
                                    <Loader className="size-4 p-0 animate-spin" />
                                  ) : (
                                    <Trash2 className="size-4 p-0" />
                                  )}
                                </Button>

                                <Button
                                  className="flex items-center size-6 cursor-pointer"
                                  onClick={() => {
                                    setAddressData({
                                      id: address._id,
                                      address: address.address,
                                      appartment: address.appartment,
                                      city: address.city,
                                      postalCode: address.postalCode,
                                      phone: address.phone,
                                    });
                                    setDialogOpen(true);
                                  }}
                                  disabled={addressloading}
                                >
                                  <Edit2 className="size-4 p-0" />
                                </Button>
                              </div>
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Address:
                            </span>
                            <span className="text-gray-300 text-sm">
                              {address.address}
                            </span>
                            {address.appartment && (
                              <>
                                <span className="text-gray-500 text-sm">
                                  Apartment, suite, etc:
                                </span>
                                <span className="text-gray-300 text-sm">
                                  {address.appartment}
                                </span>
                              </>
                            )}
                            <span className="text-gray-500 text-sm">City:</span>
                            <span className="text-gray-300 text-sm">
                              {address.city}
                            </span>
                            <span className="text-gray-500 text-sm">
                              Postal Code:
                            </span>
                            <span className="text-gray-300 text-sm">
                              {address.postalCode}
                            </span>
                            <span className="text-gray-500 text-sm">
                              Phone:
                            </span>
                            <span className="text-gray-300 text-sm">
                              {address.phone}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Address</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddress}>
                  <div className="flex flex-col gap-4 py-4">
                    <Input
                      type="text"
                      placeholder="Address"
                      value={addressData.address}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Apartment, suite, etc (optional)"
                      value={addressData.appartment}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          appartment: e.target.value,
                        })
                      }
                    />
                    <div className="flex gap-4">
                      <Input
                        type="text"
                        placeholder="City"
                        required
                        value={addressData.city}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            city: e.target.value,
                          })
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Postal code"
                        required
                        value={addressData.postalCode}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Input
                      type="text"
                      placeholder="Phone"
                      required
                      value={addressData.phone}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={"flex justify-end gap-2"}>
                    <Button
                      type="submit"
                      className={"cursor-pointer"}
                      disabled={addressloading}
                    >
                      {addressloading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
    </>
  )
}

export default ProfileDetails