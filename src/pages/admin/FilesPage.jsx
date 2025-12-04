import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function FilesPage() {
  const [files, setFiles] = useLocalStorageArray("admin_files", [
    {
      id: 1,
      name: "contract_template.pdf",
      type: "pdf",
      size: 245000,
      uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      category: "Документы",
    },
    {
      id: 2,
      name: "logo.png",
      type: "image",
      size: 48000,
      uploadedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      category: "Изображения",
    },
    {
      id: 3,
      name: "report_q4.xlsx",
      type: "excel",
      size: 156000,
      uploadedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      category: "Отчеты",
    },
  ]);

  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getFileIcon = (type) => {
    const icons = {
      pdf: "📄",
      image: "🖼️",
      excel: "📊",
      word: "📝",
      zip: "📦",
      video: "🎥",
      audio: "🎵",
    };
    return icons[type] || "📁";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleDelete = (id) => {
    const file = files.find((f) => f.id === id);
    if (window.confirm(`Удалить файл "${file.name}"?`)) {
      setFiles(files.filter((f) => f.id !== id));
    }
  };

  const handleUpload = () => {
    // Симуляция загрузки файла
    const newFile = {
      id: Date.now(),
      name: `new_file_${Date.now()}.pdf`,
      type: "pdf",
      size: Math.floor(Math.random() * 500000) + 10000,
      uploadedAt: new Date().toISOString(),
      category: "Документы",
    };
    setFiles([newFile, ...files]);
  };

  const filteredFiles = files.filter((file) => {
    if (filter !== "all" && file.category !== filter) return false;
    if (searchTerm) {
      return file.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const stats = {
    total: files.length,
    totalSize: files.reduce((sum, f) => sum + f.size, 0),
    documents: files.filter((f) => f.type === "pdf" || f.type === "word").length,
    images: files.filter((f) => f.type === "image").length,
  };

  const categories = ["all", "Документы", "Изображения", "Отчеты", "Прочее"];

  return (
    <div className="files-page">
      <div className="page-header">
        <div>
          <h2>📁 Файловый менеджер</h2>
          <p className="muted">Управление загруженными файлами</p>
        </div>
        <button className="btn btn--primary" onClick={handleUpload}>
          ⬆️ Загрузить файл
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-icon">📦</span>
          <div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Всего файлов</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">💾</span>
          <div>
            <div className="stat-value">{formatFileSize(stats.totalSize)}</div>
            <div className="stat-label">Общий размер</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📄</span>
          <div>
            <div className="stat-value">{stats.documents}</div>
            <div className="stat-label">Документов</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🖼️</span>
          <div>
            <div className="stat-value">{stats.images}</div>
            <div className="stat-label">Изображений</div>
          </div>
        </div>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск файлов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={filter === cat ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter(cat)}
            >
              {cat === "all" ? "Все" : cat}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "view-btn active" : "view-btn"}
            onClick={() => setViewMode("grid")}
            title="Сетка"
          >
            ▦
          </button>
          <button
            className={viewMode === "list" ? "view-btn active" : "view-btn"}
            onClick={() => setViewMode("list")}
            title="Список"
          >
            ☰
          </button>
        </div>
      </div>

      {filteredFiles.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <p>Файлы не найдены</p>
          <button className="btn btn--ghost" onClick={handleUpload}>
            Загрузить первый файл
          </button>
        </div>
      )}

      {viewMode === "grid" && filteredFiles.length > 0 && (
        <div className="files-grid">
          {filteredFiles.map((file) => (
            <div key={file.id} className="file-card">
              <div className="file-icon-large">{getFileIcon(file.type)}</div>
              <div className="file-info">
                <div className="file-name" title={file.name}>
                  {file.name}
                </div>
                <div className="file-meta">
                  <span>{formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>{new Date(file.uploadedAt).toLocaleDateString("ru-RU")}</span>
                </div>
                <div className="file-category">{file.category}</div>
              </div>
              <div className="file-actions">
                <button className="action-btn" title="Скачать">
                  ⬇️
                </button>
                <button className="action-btn" title="Просмотр">
                  👁️
                </button>
                <button
                  className="action-btn danger"
                  title="Удалить"
                  onClick={() => handleDelete(file.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "list" && filteredFiles.length > 0 && (
        <table className="files-table">
          <thead>
            <tr>
              <th>Файл</th>
              <th>Тип</th>
              <th>Категория</th>
              <th>Размер</th>
              <th>Дата загрузки</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file) => (
              <tr key={file.id}>
                <td>
                  <div className="file-cell">
                    <span className="file-icon">{getFileIcon(file.type)}</span>
                    <span>{file.name}</span>
                  </div>
                </td>
                <td>{file.type.toUpperCase()}</td>
                <td>
                  <span className="category-badge">{file.category}</span>
                </td>
                <td>{formatFileSize(file.size)}</td>
                <td>{new Date(file.uploadedAt).toLocaleDateString("ru-RU")}</td>
                <td>
                  <div className="table-actions">
                    <button className="action-btn" title="Скачать">
                      ⬇️
                    </button>
                    <button className="action-btn" title="Просмотр">
                      👁️
                    </button>
                    <button
                      className="action-btn danger"
                      title="Удалить"
                      onClick={() => handleDelete(file.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style>{`
        .files-page {
          max-width: 1600px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-header h2 {
          color: #fff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-value {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .controls-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
        }

        .search-box input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(26, 31, 58, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
        }

        .category-filter {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.875rem 1.25rem;
          background: rgba(26, 31, 58, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .filter-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          color: #fff;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
          border-color: transparent;
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
          background: rgba(26, 31, 58, 0.6);
          padding: 0.25rem;
          border-radius: 8px;
        }

        .view-btn {
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          border-radius: 6px;
          font-size: 1.25rem;
          transition: all 0.2s;
        }

        .view-btn:hover {
          color: #fff;
          background: rgba(99, 102, 241, 0.2);
        }

        .view-btn.active {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
        }

        .files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .file-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.2s;
        }

        .file-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .file-icon-large {
          font-size: 4rem;
          text-align: center;
        }

        .file-info {
          flex: 1;
          text-align: center;
        }

        .file-name {
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-meta {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .file-category {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(99, 102, 241, 0.2);
          color: #6366f1;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .file-actions {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-btn {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }

        .action-btn:hover {
          background: rgba(99, 102, 241, 0.3);
          border-color: #6366f1;
        }

        .action-btn.danger:hover {
          background: rgba(239, 68, 68, 0.3);
          border-color: #ef4444;
        }

        .files-table {
          width: 100%;
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .files-table th {
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          text-align: left;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .files-table td {
          color: #fff;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .files-table tr:last-child td {
          border-bottom: none;
        }

        .file-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .file-icon {
          font-size: 1.5rem;
        }

        .category-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(99, 102, 241, 0.2);
          color: #6366f1;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .table-actions {
          display: flex;
          gap: 0.5rem;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        .empty-icon {
          font-size: 5rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state p {
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }
      `}</style>
    </div>
  );
}