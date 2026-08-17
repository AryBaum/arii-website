import { error } from '@sveltejs/kit';
import { getProjectBySlug, getAdjacentProjects } from '$lib/data/projects.js';

export function load({ params }) {
    const project = getProjectBySlug(params.slug);
    if (!project) throw error(404, 'Project not found');

    const { prev, next } = getAdjacentProjects(params.slug);
    return { project, prev, next };
}