import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react";

export default function ModalUpdate({ id, s }) {
    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset,
    } = useForm({
        id: s.id,
        first_name: s.first_name,
        last_name: s.last_name,
        department: s.department,
        email: s.email,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(`/updateStudent/${s.id}`, {
            _method: "patch",
            ...editData,
        }, {
            onSuccess: () => {
                document.getElementById(id).close(); // ✅ Автоматско затворање
                reset();
            }
        });
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(id).showModal()}
                className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 border rounded-md text-white uppercase"
            >
                Edit
            </button>

            <dialog id={id} className="modal">
                <div className="modal-box bg-slate-50">
                    <div className="modal-header">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => reset()}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="modal-body">
                        <h3 className="font-bold text-lg">
                            Edit {s.first_name} Details
                            <small className="block">ID: {editData.id}</small>
                        </h3>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="first_name" value="First Name" />
                                <TextInput
                                    id="first_name"
                                    className="mt-1 block w-full"
                                    value={editData.first_name}
                                    onChange={(e) => setEditData("first_name", e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.first_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="last_name" value="Last Name" />
                                <TextInput
                                    id="last_name"
                                    className="mt-1 block w-full"
                                    value={editData.last_name}
                                    onChange={(e) => setEditData("last_name", e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.last_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="department" value="Department" />
                                <TextInput
                                    id="department"
                                    className="mt-1 block w-full"
                                    value={editData.department}
                                    onChange={(e) => setEditData("department", e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.department} />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={editData.email}
                                    onChange={(e) => setEditData("email", e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 border rounded-md text-white uppercase"
                                disabled={processing}
                            >
                                Confirm Update
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
