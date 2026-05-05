package controllers

import (
	"gin-app/models"
	"gin-app/utility"
	"gin-app/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateGuru(c *gin.Context) {
	nama := c.PostForm("nama")
	jabatan := c.PostForm("jabatan")
	nip := c.PostForm("nip")
	

	fileBytes, objectPath, contentType, err := utility.ProcessImageUpload(c, "foto")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	publicURL, err := services.UploadToSupabase("guru", objectPath, contentType, fileBytes)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengunggah gambar " })
		return
	}

	guru := models.Guru{
		Nama:    nama,
		Jabatan: jabatan,
		Nip:     nip,
		Foto:    publicURL,
	}

	_ , err = services.CreateGuru(guru)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat data guru " })
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Data berhasil dibuat",
	})
}

func GetGuru(c *gin.Context) {
	guru, err := services.GetGuru()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, guru)
}

func EditGuru(c *gin.Context) {
	id := c.Param("id")

	nama := c.PostForm("nama")
	jabatan := c.PostForm("jabatan")
	nip := c.PostForm("nip")

	
	guru := models.Guru{
		Nama:    nama,
		Jabatan: jabatan,
		Nip:     nip,
		
	}

	file, _ := c.FormFile("foto")
	if file != nil {
		oldObjectPath, err := services.GetFotoGuru(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mendapatkan data guru " })
			return
		}

		oldFoto := utility.ExtractObjectPath(oldObjectPath, "guru")

		fileBytes, objectPath, contentType, err := utility.ProcessImageUpload(c, "foto")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		publicURL, err := services.UpdateSupabaseFile("guru", oldFoto , objectPath, contentType, fileBytes)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		guru.Foto = publicURL
	}


	_ , err := services.EditGuru(id, guru)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat data guru " })
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Data berhasil diupdate",
	})
}

func DeleteGuru(c *gin.Context) {
	id := c.Param("id")	

	foto, err := services.GetFotoGuru(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mendapatkan data guru " })
		return
	}
	
	if foto != "" {
		fotopath := utility.ExtractObjectPath(foto, "guru")
		err = services.DeleteFromSupabase("guru",fotopath)
		if err != nil{
			c.JSON(http.StatusInternalServerError, gin.H{"error" : "Gagal Menhapus Foto"})
			return
		}
	}

	err = services.DeleteGuru(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Data berhasil dihapus",
	})
}
	