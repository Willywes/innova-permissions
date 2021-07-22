<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Willywes\ApiResponse\ApiResponse;

class ProjectController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        return ApiResponse::JsonSuccess(['projects' => Project::all()]);
    }

    public function create(): \Illuminate\Http\JsonResponse
    {
        return ApiResponse::JsonSuccess([]);
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        try {

            $rules = [
                'name' => 'required|unique:projects,name',
                'driver' => 'required',
                'host' => 'required',
                'port' => 'required',
                'database' => 'required',
                'username' => 'required',
                'charset' => 'required',
                'collation' => 'required',
            ];

            $messages = [
                'name.required' => 'El nombre del proyecto es requerido.',
                'name.unique' => 'El nombre ya ha sido registrado.',
                'driver.required' => 'El driver es requerido, mysql es lo habitual.',
                'host.required' => 'El host es requerido, localhost es por defecto para desarrollo local.',
                'port.required' => 'El puerto es requerido, 3306 es por defecto para mysql.',
                'database.required' => 'El nombre de la base de datos es requerido.',
                'username.required' => 'El username es requerido, root es por defecto para desarrollo local.',
                'charset.required' => 'El charset es requerido, utf8 es por defecto según nuestras configuraciones.',
                'collation.required' => 'El collation es requerido, utf8_general_ci es por defecto según nuestras configuraciones.',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $project = new Project();

                $project->name = $request->name;
                $project->description = $request->description;

                $parts['driver'] = trim($request->driver) ?? 'mysql';
                $parts['host'] = trim($request->host) ?? 'localhost';
                $parts['port'] = trim($request->port) ?? '3306';
                $parts['database'] = trim($request->database);
                $parts['username'] = trim($request->username);
                $parts['password'] = trim($request->password) ?? '';
                $parts['charset'] = trim($request->charset) ?? 'utf8';
                $parts['collation'] = trim($request->collation) ?? 'utf8_general_ci';
                $parts['prefix'] = trim($request->prefix) ?? '';

                $project->database_connection = $parts;

                $project->laravel_guards = $request->laravel_guards ?? '["intranet", "customer"]';
                $project->user_classes = $request->user_classes ?? '["User::class", "Customer::class"]';

                if ($project->save()) {
                    return ApiResponse::JsonSuccess(['project' => $project], 'Proyecto creado correctamente.');
                } else {
                    return ApiResponse::JsonError(null, 'Error al crear el proyecto.');
                }

            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function edit(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $project = Project::find($request->project_id);

            if (!$project) {
                return ApiResponse::JsonError(null, 'Proyecto no encontrado');
            }
            return ApiResponse::JsonSuccess(['project' => $project]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function update(Request $request): \Illuminate\Http\JsonResponse
    {
        try {

            $project = Project::find($request->id);

            if (!$project) {
                return ApiResponse::JsonError(null, 'Proyecto no encontrado');
            }

            $rules = [
                'name' => 'required|unique:projects,name,' . $request->id,
                'driver' => 'required',
                'host' => 'required',
                'port' => 'required',
                'database' => 'required',
                'username' => 'required',
                'charset' => 'required',
                'collation' => 'required',
            ];

            $messages = [
                'name.required' => 'El nombre del proyecto es requerido.',
                'name.unique' => 'El nombre ya ha sido registrado.',
                'driver.required' => 'El driver es requerido, mysql es lo habitual.',
                'host.required' => 'El host es requerido, localhost es por defecto para desarrollo local.',
                'port.required' => 'El puerto es requerido, 3306 es por defecto para mysql.',
                'database.required' => 'El nombre de la base de datos es requerido.',
                'username.required' => 'El username es requerido, root es por defecto para desarrollo local.',
                'charset.required' => 'El charset es requerido, utf8 es por defecto según nuestras configuraciones.',
                'collation.required' => 'El collation es requerido, utf8_general_ci es por defecto según nuestras configuraciones.',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $project->name = $request->name;
                $project->description = $request->description;

                $parts['driver'] = trim($request->driver) ?? 'mysql';
                $parts['host'] = trim($request->host) ?? 'localhost';
                $parts['port'] = trim($request->port) ?? '3306';
                $parts['database'] = trim($request->database);
                $parts['username'] = trim($request->username);
                $parts['password'] = trim($request->password) ?? '';
                $parts['charset'] = trim($request->charset) ?? 'utf8';
                $parts['collation'] = trim($request->collation) ?? 'utf8_general_ci';
                $parts['prefix'] = trim($request->prefix) ?? '';

                $project->database_connection = $parts;

                $project->laravel_guards = $request->laravel_guards ?? '["intranet", "customer"]';
                $project->user_classes = $request->user_classes ?? '["User::class", "Customer::class"]';

                if ($project->save()) {
                    return ApiResponse::JsonSuccess(['project' => $project], 'Proyecto creado correctamente.');
                } else {
                    return ApiResponse::JsonError(null, 'Error al crear el proyecto.');
                }

            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $project = Project::find($request->project_id);

            if (!$project) {
                return ApiResponse::JsonError(null, 'Proyecto no encontrado');
            }

            if ($project->delete()) {
                return ApiResponse::JsonSuccess(['project_id' => $request->project_id], 'Proyecto eliminado correctamente');
            } else {
                return ApiResponse::JsonError(null, 'Error al eliminar el proyecto.');
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
