"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { FiPlus, FiEdit2, FiMapPin, FiClock, FiLoader, FiTrash2, FiX, FiUpload, FiImage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function LocationsPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        city: "",
        address: "",
        hours: "06:00 - 23:00",
        image: "",
        status: "Active"
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("/api/fitness/locations");
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch locations");
            }
            
            setLocations(data.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch locations:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddLocation = async (e: React.FormEvent) => {
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
            const res = await fetch("/api/fitness/locations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to add location");
            }
            
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
            fetchLocations();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to add location:", err);
            }
        }
    };

    const handleUpdateLocation = async (e: React.FormEvent) => {
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
            const res = await fetch(`/api/fitness/locations/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to update location");
            }

            setIsEditModalOpen(false);
            setIsAddModalOpen(false);
            resetForm();
            fetchLocations();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to update location:", err);
            }
        }
    };

    const deleteLocation = async (id: string) => {
        if (!confirm("Are you sure you want to remove this location?")) return;
        try {
            setError(null);
            const res = await fetch(`/api/fitness/locations/${id}`, { method: 'DELETE' });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to delete location");
            }
            
            fetchLocations();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to delete location:", err);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            city: "",
            address: "",
            hours: "06:00 - 23:00",
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
            setImagePreview(data.url);
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

    const openEditModal = (location: any) => {
        setFormData({
            name: location.name,
            city: location.city,
            address: location.address,
            hours: location.hours,
            image: location.image || "",
            status: location.status
        });
        setEditingId(location.id);
        setImagePreview(location.image || null);
        setSelectedFile(null);
        setIsEditModalOpen(true);
    };

    return (
        <AdminAuthGuard>
            <div>
                <AdminHeader title="Locations" />
                {error && (
                    <div className="mx-8 mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

            <div className="p-8">
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <p className={`${colors.textMuted} text-sm`}>{locations.length} locations active</p>
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors"
                    >
                        <FiPlus /> Add Location
                    </button>
                </div>

                {/* Locations Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin" />
                        <p className={`${colors.textMuted} text-[10px] uppercase tracking-[0.2em] font-bold`}>Chargement des clubs...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {locations.map((location, index) => (
                            <motion.div
                                key={location.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`${colors.card} border ${colors.border} rounded-2xl overflow-hidden hover:border-[#D4AF37]/20 transition-colors group shadow-sm`}
                            >
                                {/* Image */}
                                <div className="relative h-40 overflow-hidden">
                                    {location.image && location.image.trim() !== '' ? (
                                        <Image
                                            src={location.image}
                                            alt={location.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover z-10"
                                            unoptimized
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                            <FiMapPin className={`w-12 h-12 ${theme === 'dark' ? 'text-white/10' : 'text-gray-300'}`} />
                                        </div>
                                    )}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-[#0A0A0A]' : 'from-white'} to-transparent z-20`} />
                                    <div className="absolute top-4 right-4 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(location);
                                            }}
                                            className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg"
                                            title="Modifier le club"
                                        >
                                            <FiEdit2 size={16} className="sm:w-3.5 sm:h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteLocation(location.id);
                                            }}
                                            className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 transition-all shadow-lg"
                                            title="Supprimer le club"
                                        >
                                            <FiTrash2 size={16} className="sm:w-3.5 sm:h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="text-[#D4AF37] text-[10px] uppercase tracking-wider font-bold">{location.city}</span>
                                            <h3 className={`${colors.text} font-bold text-lg`}>{location.name}</h3>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${location.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`}>
                                            {location.status}
                                        </span>
                                    </div>

                                    <div className={`space-y-2 text-sm ${colors.textSubtle}`}>
                                        <div className="flex items-start gap-2">
                                            <FiMapPin className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                            <span>{location.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiClock className="text-[#D4AF37]" />
                                            <span>{location.hours}</span>
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
                                    {isAddModalOpen ? "Nouveau Club" : "Modifier Club"}
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
                                <form id="location-form" onSubmit={isAddModalOpen ? handleAddLocation : handleUpdateLocation} noValidate className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Ville</label>
                                        <input
                                            type="text" required
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                            placeholder="Casablanca"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Nom du Club</label>
                                        <input
                                            type="text" required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                            placeholder="The Oasis"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Adresse</label>
                                    <input
                                        type="text" required
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        placeholder="123 Rue de la Sport..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Image du Club</label>
                                    
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
                                                    const fallback = target.parentElement?.querySelector('.preview-fallback') as HTMLElement;
                                                    if (fallback) fallback.style.display = 'flex';
                                                }}
                                            />
                                            <div 
                                                aria-hidden="true" 
                                                className="preview-fallback absolute inset-0 w-full h-full flex items-center justify-center bg-white/5 hidden"
                                            >
                                                <span className={`${theme === 'dark' ? 'text-white/20' : 'text-gray-400'} text-4xl font-black`}>
                                                    <FiMapPin />
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
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Horaires</label>
                                    <input
                                        type="text"
                                        value={formData.hours}
                                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        placeholder="06:00 - 23:00"
                                    />
                                </div>
                                </form>
                            </div>

                            {/* Footer - Fixed */}
                            <div className={`p-4 sm:p-6 pt-4 border-t ${colors.border} flex-shrink-0`}>
                                <button
                                    type="submit"
                                    form="location-form"
                                    disabled={uploadingImage}
                                    className={`w-full py-3 sm:py-4 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-white transition-all ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {uploadingImage ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <FiLoader className="animate-spin" /> Upload en cours...
                                        </span>
                                    ) : (
                                        isAddModalOpen ? "Ouvrir le Club" : "Enregistrer"
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
