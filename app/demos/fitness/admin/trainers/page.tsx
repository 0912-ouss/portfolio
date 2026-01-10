"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiCalendar, FiLoader, FiX, FiUpload, FiImage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";
import { Trainer } from "@/types/fitness";

export default function TrainersPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        name: "",
        specialty: "",
        bio: "",
        image: "",
        status: "Active"
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("/api/fitness/trainers");
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch trainers");
            }
            
            setTrainers(data.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch trainers:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddTrainer = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prevent submission while uploading
        if (uploadingImage) {
            setError("Veuillez attendre la fin de l'upload de l'image");
            return;
        }
        
        // Check if there's a selected file that hasn't been uploaded
        if (selectedFile && !formData.image) {
            setError("Veuillez d'abord uploader l'image avant de sauvegarder");
            return;
        }

        try {
            setError(null);
            const res = await fetch("/api/fitness/trainers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to add trainer");
            }
            
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
            fetchTrainers();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to add trainer:", err);
            }
        }
    };

    const handleUpdateTrainer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        // Prevent submission while uploading
        if (uploadingImage) {
            setError("Veuillez attendre la fin de l'upload de l'image");
            return;
        }

        // Check if there's a selected file that hasn't been uploaded
        if (selectedFile && !formData.image) {
            setError("Veuillez d'abord uploader l'image avant de sauvegarder");
            return;
        }

        try {
            setError(null);
            const res = await fetch(`/api/fitness/trainers/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to update trainer");
            }

            setIsEditModalOpen(false);
            setIsAddModalOpen(false);
            resetForm();
            fetchTrainers();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to update trainer:", err);
            }
        }
    };

    const deleteTrainer = async (id: string) => {
        if (!confirm("Are you sure you want to remove this trainer?")) return;
        try {
            setError(null);
            const res = await fetch(`/api/fitness/trainers/${id}`, { method: 'DELETE' });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to delete trainer");
            }
            
            fetchTrainers();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to delete trainer:", err);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            specialty: "",
            bio: "",
            image: "",
            status: "Active"
        });
        setEditingId(null);
        setSelectedFile(null);
        setImagePreview(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = async () => {
        if (!selectedFile) return;

        try {
            setUploadingImage(true);
            setError(null);

            const uploadFormData = new FormData();
            uploadFormData.append("file", selectedFile);

            const res = await fetch("/api/fitness/upload", {
                method: "POST",
                body: uploadFormData
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to upload image");
            }

            // Update form data with uploaded image URL
            setFormData({ ...formData, image: data.url });
            setImagePreview(data.url); // Set preview to uploaded image
            setSelectedFile(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to upload image";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to upload image:", err);
            }
        } finally {
            setUploadingImage(false);
        }
    };

    const openEditModal = (trainer: any) => {
        setFormData({
            name: trainer.name,
            specialty: trainer.specialty,
            bio: trainer.bio || "",
            image: trainer.image || "",
            status: trainer.status
        });
        setEditingId(trainer.id);
        setImagePreview(trainer.image || null);
        setSelectedFile(null);
        setIsEditModalOpen(true);
    };

    return (
        <AdminAuthGuard>
            <div>
                <AdminHeader title="Trainers" />
                {error && (
                    <div className="mx-8 mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

            <div className="p-8">
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <p className={`${colors.textMuted} text-sm`}>{trainers.length} trainers registered</p>
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors"
                    >
                        <FiPlus /> Add Trainer
                    </button>
                </div>

                {/* Trainers Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin" />
                        <p className={`${colors.textMuted} text-[10px] uppercase tracking-[0.2em] font-bold`}>Chargement de l'équipe...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainers.map((trainer, index) => (
                            <motion.div
                                key={trainer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className={`${colors.card} border ${colors.border} rounded-2xl overflow-hidden hover:border-[#D4AF37]/20 transition-colors group shadow-sm`}
                            >
                                {/* Image */}
                                <div className={`relative h-48 w-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    {trainer.image && trainer.image.trim() !== '' ? (
                                        <>
                                            <Image
                                                src={trainer.image}
                                                alt={trainer.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 z-10"
                                                unoptimized
                                                onError={(e) => {
                                                    // Hide image on error
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    // Show fallback
                                                    const fallback = target.parentElement?.querySelector('.image-fallback') as HTMLElement;
                                                    if (fallback) fallback.style.display = 'flex';
                                                }}
                                            />
                                            <div 
                                                aria-hidden="true" 
                                                className="image-fallback absolute inset-0 w-full h-full flex items-center justify-center bg-white/5 hidden z-0"
                                            >
                                                <span className={`${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} text-6xl font-black`}>
                                                    {trainer.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div 
                                            aria-hidden="true" 
                                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                                        >
                                            <span className={`${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} text-6xl font-black`}>
                                                {trainer.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(trainer);
                                            }}
                                            className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg"
                                            title="Modifier le coach"
                                        >
                                            <FiEdit2 size={16} className="sm:w-3.5 sm:h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTrainer(trainer.id);
                                            }}
                                            className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 transition-all shadow-lg"
                                            title="Supprimer le coach"
                                        >
                                            <FiTrash2 size={16} className="sm:w-3.5 sm:h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className={`${colors.text} font-bold text-lg`}>{trainer.name}</h3>
                                            <p className="text-[#D4AF37] text-xs uppercase tracking-wider">{trainer.specialty}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${trainer.status === "Active"
                                            ? "bg-green-500/10 text-green-500"
                                            : "bg-gray-500/10 text-gray-500"
                                            }`}>
                                            {trainer.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm">
                                        <div className={`flex items-center gap-2 ${colors.textSubtle}`}>
                                            <FiCalendar className="text-[#D4AF37]" />
                                            <span>Sessions actives</span>
                                        </div>
                                        <div className={`flex items-center gap-2 ${colors.textSubtle}`}>
                                            <FiStar className="text-[#D4AF37]" />
                                            <span>Elite</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-contain">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { 
                                setIsAddModalOpen(false); 
                                setIsEditModalOpen(false);
                                resetForm();
                            }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full max-w-md max-h-[90vh] ${colors.card} border ${colors.border} rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto`}
                        >
                            {/* Header - Fixed */}
                            <div className={`flex justify-between items-center p-4 sm:p-6 pb-4 border-b ${colors.border} flex-shrink-0`}>
                                <h3 className={`${colors.text} text-lg sm:text-xl font-bold`}>
                                    {isAddModalOpen ? "Nouveau Coach" : "Modifier Coach"}
                                </h3>
                                <button
                                    onClick={() => { 
                                        setIsAddModalOpen(false); 
                                        setIsEditModalOpen(false);
                                        resetForm();
                                    }}
                                    className={`${colors.textMuted} hover:${colors.text} transition-colors p-1`}
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-6">
                                <form id="trainer-form" onSubmit={isAddModalOpen ? handleAddTrainer : handleUpdateTrainer} noValidate className="space-y-4 sm:space-y-6">
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Nom Complet</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        placeholder="Marc Aurele"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Spécialité</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        placeholder="Force & Conditionnement"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Image du Coach</label>
                                    
                                    {/* Image Preview */}
                                    {(imagePreview || formData.image) && (
                                        <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden mb-2 border border-[#D4AF37]/20 bg-gray-100 dark:bg-white/5">
                                            <Image
                                                src={imagePreview || formData.image}
                                                alt="Preview"
                                                fill
                                                className="object-cover preview-image"
                                                unoptimized
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    // Show fallback
                                                    const fallback = target.parentElement?.querySelector('.preview-fallback') as HTMLElement;
                                                    if (fallback) fallback.style.display = 'flex';
                                                }}
                                            />
                                            <div 
                                                aria-hidden="true" 
                                                className="preview-fallback absolute inset-0 w-full h-full flex items-center justify-center bg-white/5 hidden"
                                            >
                                                <span className={`${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} text-4xl font-black`}>
                                                    <FiImage />
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setFormData({ ...formData, image: "" });
                                                    setSelectedFile(null);
                                                }}
                                                className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 transition-all z-10"
                                                title="Supprimer l'image"
                                            >
                                                <FiX size={12} className="sm:w-3.5 sm:h-3.5" />
                                            </button>
                                        </div>
                                    )}

                                    {/* File Upload Input */}
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <label className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-dashed ${colors.border} cursor-pointer hover:border-[#D4AF37]/50 transition-colors ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                disabled={uploadingImage}
                                                className="hidden"
                                            />
                                            <FiUpload className={`${uploadingImage ? 'animate-spin' : ''} w-4 h-4 sm:w-5 sm:h-5`} />
                                            <span className={`text-xs sm:text-sm ${colors.textMuted} truncate max-w-[150px] sm:max-w-none`}>
                                                {uploadingImage ? 'Upload...' : selectedFile ? selectedFile.name : 'Choisir une image'}
                                            </span>
                                        </label>
                                        {selectedFile && !uploadingImage && (
                                            <button
                                                type="button"
                                                onClick={handleImageUpload}
                                                className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#D4AF37] text-black rounded-xl font-bold text-xs sm:text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                                            >
                                                <FiImage className="w-4 h-4" /> <span className="hidden sm:inline">Upload</span>
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Manual URL Input (Optional) */}
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => {
                                                const url = e.target.value;
                                                setFormData({ ...formData, image: url });
                                                setImagePreview(url || null);
                                                if (!url) setSelectedFile(null);
                                            }}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#D4AF37]/50`}
                                            placeholder="Ou entrez une URL d'image..."
                                        />
                                        <p className={`${colors.textMuted} text-[10px] mt-1`}>Ou utilisez une URL d'image externe</p>
                                    </div>
                                    
                                    {/* Upload Success Indicator */}
                                    {formData.image && !selectedFile && !uploadingImage && (
                                        <p className={`text-green-500 dark:text-green-400 text-xs mt-1 flex items-center gap-1`}>
                                            <FiImage /> Image prête à être sauvegardée
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 h-20 sm:h-24 resize-y`}
                                        placeholder="Expert en..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                </form>
                            </div>

                            {/* Footer - Fixed */}
                            <div className={`p-4 sm:p-6 pt-4 border-t ${colors.border} flex-shrink-0`}>
                                <button
                                    type="submit"
                                    form="trainer-form"
                                    disabled={uploadingImage}
                                    className={`w-full py-3 sm:py-4 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-white transition-all ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {uploadingImage ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <FiLoader className="animate-spin" /> Upload en cours...
                                        </span>
                                    ) : (
                                        isAddModalOpen ? "Recruter le Coach" : "Enregistrer"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            </div>
        </AdminAuthGuard>
    );
}
