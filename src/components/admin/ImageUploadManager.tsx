"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, Plus, GripVertical, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProductImage {
  id?: string;
  url: string;
  alt: string;
  position: number;
}

interface ImageUploadManagerProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  productName?: string;
}

export default function ImageUploadManager({ images, onChange, productName }: ImageUploadManagerProps) {
  const [urlInput, setUrlInput] = useState("");
  const [altInput, setAltInput] = useState("");
  const [showUrlForm, setShowUrlForm] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function addImageUrl() {
    if (!urlInput.trim()) return;
    
    const newImage: ProductImage = {
      url: urlInput.trim(),
      alt: altInput.trim() || productName || "Product image",
      position: images.length,
    };
    
    onChange([...images, newImage]);
    setUrlInput("");
    setAltInput("");
    setShowUrlForm(false);
  }

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index);
    // Reorder positions
    const reordered = updated.map((img, i) => ({ ...img, position: i }));
    onChange(reordered);
  }

  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const updated = [...images];
    const dragged = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, dragged);
    
    // Update positions
    const reordered = updated.map((img, i) => ({ ...img, position: i }));
    onChange(reordered);
    setDraggedIndex(index);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-text-primary">תמונות מוצר</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowUrlForm(!showUrlForm)}
        >
          <Plus className="h-4 w-4" />
          הוסף תמונה
        </Button>
      </div>

      {/* Add Image URL Form */}
      {showUrlForm && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              URL תמונה *
            </label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://placehold.co/800x800/..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-xs text-text-muted mt-1">
              💡 טיפ: השתמש ב-
              <a href="https://placehold.co" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                placehold.co
              </a>
              {" "}או העלה לתיקיית public/images/products/
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              תיאור תמונה (Alt text)
            </label>
            <input
              type="text"
              value={altInput}
              onChange={(e) => setAltInput(e.target.value)}
              placeholder={`${productName || "Product"} - תמונה ${images.length + 1}`}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={addImageUrl}>
              <LinkIcon className="h-4 w-4" />
              הוסף תמונה
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowUrlForm(false);
                setUrlInput("");
                setAltInput("");
              }}
            >
              ביטול
            </Button>
          </div>
        </div>
      )}

      {/* Image List */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "relative group bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-accent transition-all cursor-move",
                draggedIndex === index && "opacity-50"
              )}
            >
              {/* Image Preview */}
              <div className="relative aspect-square bg-gray-100">
                {image.url ? (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Upload className="h-8 w-8" />
                  </div>
                )}
                
                {/* Position Badge */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                  #{index + 1}
                </div>

                {/* Drag Handle */}
                <div className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-4 w-4" />
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Alt Text */}
              <div className="p-2 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-text-secondary truncate" title={image.alt}>
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-text-secondary mb-2">אין תמונות למוצר זה</p>
          <p className="text-xs text-text-muted">לחץ על &quot;הוסף תמונה&quot; כדי להתחיל</p>
        </div>
      )}

      {/* Quick Add Placeholder */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium text-text-primary mb-2">🎨 הוספה מהירה של placeholder:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { color: "E8F5E9/2E7D32", label: "ירוק (מזון כלבים)" },
            { color: "F3E5F5/6A1B9A", label: "סגול (מזון חתולים)" },
            { color: "FFEBEE/C62828", label: "אדום (צעצועים)" },
            { color: "FFF3E0/E65100", label: "כתום (חטיפים)" },
            { color: "EFEBE9/4E342E", label: "חום (חול)" },
          ].map((preset) => (
            <button
              key={preset.color}
              type="button"
              onClick={() => {
                const productSlug = productName?.replace(/\s+/g, '+') || 'Product';
                const url = `https://placehold.co/800x800/${preset.color}?text=${productSlug}&font=assistant`;
                onChange([...images, {
                  url,
                  alt: `${productName} - תמונה ${images.length + 1}`,
                  position: images.length
                }]);
              }}
              className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-2">
          💡 placeholders מושלמים לפיתוח ובדיקות. אפשר להחליף לתמונות אמיתיות מאוחר יותר.
        </p>
      </div>

      <div className="text-xs text-text-muted space-y-1">
        <p>🔄 גרור תמונות לסידור מחדש</p>
        <p>🗑️ לחץ על אייקון הפח למחיקה</p>
        <p>#1 תהיה התמונה הראשית בדף המוצר</p>
      </div>
    </div>
  );
}
