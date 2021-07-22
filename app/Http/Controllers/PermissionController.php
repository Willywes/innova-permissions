<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Willywes\ApiResponse\ApiResponse;

class PermissionController extends Controller
{


    public function index(Request $request)
    {
        try {

            $project = Project::find($request->project_id);

            if (!$project) {
                return ApiResponse::JsonError(null, 'Proyecto no encontrado');
            }

            $this->setUseDatabase($project);

            $permissions = Permission::orderBy('public_group')->orderBy('id')->get();

            return ApiResponse::JsonSuccess([
                'project' => $project,
                'permissions_count' => count($permissions),
                'permissions_groups' => $permissions->unique('public_group')->pluck('public_group'),
                'permissions' => $permissions
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function cellEdit(Request $request)
    {
        try {

            $project = Project::find($request->project_id);

            if (!$project) {
                return ApiResponse::JsonError(null, 'Proyecto no encontrado');
            }

            $this->setUseDatabase($project);

            $permission = Permission::find($request->id);

            if ($permission->update($request->except(['id', 'project_id']))) {
                $permission->refresh();
                return ApiResponse::JsonSuccess(['permission' => $permission], 'Permiso actualizado correctamente.');
            }
            return ApiResponse::JsonError(null, 'No se ha podido actualizar el permiso.');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, 'Exception ' . $exception->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $project = Project::find($request->project_id);

            if (!$project) {
                return ApiResponse::JsonError(null, 'Proyecto no encontrado');
            }

            $this->setUseDatabase($project);

            if ($request->data) {
                foreach ($request->data as $data) {
                    Permission::create($data);
                }
                return ApiResponse::JsonSuccess(null, 'Permisos creados correctamente.');
            } else {
                return ApiResponse::JsonError(null, 'No se recibieron permisos para registrar.');
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, 'Exception ' . $exception->getMessage());
        }
    }

    private function setUseDatabase($project)
    {
        $database_connection = $project->database_connection;
        Config::set('database.connections.dynamic.driver', $database_connection['driver']);
        Config::set('database.connections.dynamic.host', $database_connection['host']);
        Config::set('database.connections.dynamic.port', $database_connection['port']);
        Config::set('database.connections.dynamic.database', $database_connection['database']);
        Config::set('database.connections.dynamic.username', $database_connection['username']);
        Config::set('database.connections.dynamic.password', $database_connection['password']);
        Config::set('database.connections.dynamic.charset', $database_connection['charset']);
        Config::set('database.connections.dynamic.collation', $database_connection['collation']);
        Config::set('database.connections.dynamic.prefix', $database_connection['prefix']);
    }
}
