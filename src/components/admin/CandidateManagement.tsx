import React, { useState } from 'react';
import { Edit2, Plus, X, Save, Trash2 } from 'lucide-react';
import type { Candidate } from '../../types';

interface CandidateManagementProps {
  candidates: Candidate[];
  onUpdateCandidate: (candidate: Candidate) => void;
  onAddCandidate: (candidate: Candidate) => void;
  onDeleteCandidate: (candidateId: string) => void;
}

export default function CandidateManagement({
  candidates,
  onUpdateCandidate,
  onAddCandidate,
  onDeleteCandidate,
}: CandidateManagementProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Candidate>>({});

  const handleEdit = (candidate: Candidate) => {
    setEditingId(candidate.id);
    setEditForm(candidate);
  };

  const handleSave = () => {
    if (editingId && editForm.name && editForm.position && editForm.description && editForm.imageUrl) {
      onUpdateCandidate({
        ...editForm,
        id: editingId,
        votes: candidates.find(c => c.id === editingId)?.votes || 0
      } as Candidate);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleAdd = () => {
    if (editForm.name && editForm.position && editForm.description && editForm.imageUrl) {
      onAddCandidate({
        ...editForm,
        id: crypto.randomUUID(),
        votes: 0
      } as Candidate);
      setShowAddForm(false);
      setEditForm({});
    }
  };

  const renderForm = (isEditing: boolean) => (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={editForm.name || ''}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <input
          type="text"
          value={editForm.position || ''}
          onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={editForm.description || ''}
          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={editForm.imageUrl || ''}
          onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => {
            setEditingId(null);
            setShowAddForm(false);
            setEditForm({});
          }}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={isEditing ? handleSave : handleAdd}
          className="flex items-center space-x-1 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? 'Save Changes' : 'Add Candidate'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Manage Candidates</h3>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-1 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Candidate</span>
          </button>
        )}
      </div>
      <div className="p-6 space-y-6">
        {showAddForm && renderForm(false)}
        
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="border rounded-lg p-4">
              {editingId === candidate.id ? (
                renderForm(true)
              ) : (
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-900">{candidate.name}</h4>
                    <p className="text-sm text-gray-600">{candidate.position}</p>
                    <p className="text-sm text-gray-500">{candidate.description}</p>
                    <p className="text-sm text-gray-500">Current Votes: {candidate.votes}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(candidate)}
                      className="p-2 text-gray-400 hover:text-indigo-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteCandidate(candidate.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}