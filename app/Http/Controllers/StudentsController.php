<?php

namespace App\Http\Controllers;

use App\Models\Students; // ✅ Правилен модел
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class StudentsController extends Controller
{
    public function index()
    {
        return Inertia::render('StudentsDashboard', [
            'studentsData' => Students::all(), // ✅ Наместо $model->all()
            'count' => Students::count(), // ✅ Наместо $model->count()
        ]);
    }

    /* Create */
    public function store(Request $request)
    {
        Students::create($request->validate([
            'first_name' => 'required|max:255|min:2',
            'last_name' => 'required|max:255|min:2',
            'department' => 'required|max:255|min:2',
            'email' => 'required|email|max:255|unique:students,email',
        ]));

        return back()->with('message', 'Student added successfully');
    }

    /* Update */
    public function update(Request $request, $id)
    {
        Log::info('Update request received for student ID: ' . $id);
        Log::info('Update request data: ', $request->all());

        $validatedData = $request->validate([
            'first_name' => 'required|max:255|min:2',
            'last_name' => 'required|max:255|min:2',
            'department' => 'required|max:255|min:2',
            'email' => 'required|email|max:255',
        ], [
            'email.unique' => 'The email has already been taken.',
        ]);

        $student = Students::findOrFail($id); // ✅ Поправено
        $student->update($validatedData);

        return back()->with('message', 'Student updated successfully');
    }

    /* Delete */
    public function destroy($id)
    {
        $student = Students::findOrFail($id); // ✅ Поправено
        $student->delete();

        return back()->with('message', 'Student deleted successfully');
    }
}
