const { nanoid } = require("nanoid");
const notes = require("./note");

const getAllNotesHandler = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      notes,
    },
  });
  response.code(200);
  return response;
};

const getNotes = (request, h) => {
  const { id = null } = request.params;

  const note = notes.find((item) => item.id === id);

  if (note === undefined) {
    const response = h.response({
      status: "fail",
      message: "Catatan tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      note,
    },
  });
  response.code(200);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id = null } = request.params;
  const updatedAt = new Date().toISOString();
  const { title, tags, body } = request.payload;

  const note = notes.find((item) => item.id === id);

  if (note === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui catatan. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
  note.title = title;
  note.tags = tags;
  note.body = body;
  note.updatedAt = updatedAt;

  const response = h.response({
    status: "success",
    message: "Catatan berhasil diperbarui",
  });
  response.code(200);
  return response;
};

const deleteNotesHandler = (request, h) => {
  const { id = null } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
const addNoteHandler = (request, h) => {
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const { title, tags, body } = request.payload;
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (!isSuccess) {
    const response = h.response({
      status: "error",
      message: "Catatan gagal untuk ditambahkan",
    });

    response.code(400);
    return response;
  }

  const response = h.response({
    status: "success",
    message: "Catatan berhasil ditambahkan",
    data: {
      noteId: id,
    },
  });
  response.code(201);
  return response;
};

module.exports = {
  addNoteHandler,
  getNotes,
  getAllNotesHandler,
  editNoteByIdHandler,
  deleteNotesHandler,
};
