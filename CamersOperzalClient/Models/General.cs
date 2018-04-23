using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CamersOperzalClient.Models
{

    /// <summary>
    /// Описание представления о камере
    /// </summary>    
    [Table("camers_operzal_general")]
    public class General
    {

        /// <summary>
        /// Идентификатор камеры
        /// </summary>
        private int _Id;
        [Column("id"), Key()]
        public int Id 
        {
            get
            {
                return this._Id;
            }
            set
            {
                this._Id = value;
            }
        }     
   
        /// <summary>
        /// Код ИФНС
        /// </summary>
        private string _IfnsCode;
        [Column("ifns_code")]
        public string IfnsCode 
        { 
            get
            {
                return this._IfnsCode;
            }
            set
            {
                this._IfnsCode = value;
            }
        }

        /// <summary>
        /// Ссылка на изображение с камеры
        /// </summary>
        private string _CameraImgLnk;
        [Column("camera_img_link")]
        public string CameraImgLink 
        { 
            get
            {
                return this._CameraImgLnk;
            }
            set
            {
                this._CameraImgLnk = value;
            }
        }

        /// <summary>
        /// Путь для сохранения файла
        /// </summary>
        private string _CameraImgFile;
        [Column("camera_img_file")]
        public string CameraImgFile
        {
            get
            {
                return this._CameraImgFile;
            }
            set
            {
                this._CameraImgFile = value;
            }
        }
               
        /// <summary>
        /// Призак отключения камеры (например, во время ремонта или монтажа)
        /// </summary>
        private bool _CameraDisable;
        [Column("camera_disable")]
        public bool CameraDisable 
        { 
            get
            {
                return this._CameraDisable;
            }
            set
            {
                this._CameraDisable = value;
            }
        }
        
        /// <summary>
        /// Сообщение в случае отключения камеры
        /// </summary>
        private string _CameraDisableDescription;
        [Column("camera_disable_description")]
        public string CameraDisableDescription 
        { 
            get
            {
                return this._CameraDisableDescription;
            }
            set
            {
                this._CameraDisableDescription = value;
            }
        }

        /// <summary>
        /// Имя пользователя, в случае аутентефикации, для доступа к камере
        /// </summary>
        private string _CameraAuthUser;
        [Column("camera_user")]
        public string CameraAuthUser 
        { 
            get
            {
                return this._CameraAuthUser;
            }
            set
            {
                this._CameraAuthUser = value;
            }
        }
               
        /// <summary>
        /// Пароль пользователя, в случае аутентефикации, для доступа к камере
        /// </summary>
        private string _CameraAuthPassword;
        [Column("camera_password")]
        public string CameraAuthPassword 
        { 
            get
            {
                return this._CameraAuthPassword;
            }
            set
            {
                this._CameraAuthPassword = value;
            }
        }

        /// <summary>
        /// Ссылка на Инспекцию, которой соответствует текущая камера
        /// </summary>
        private Ifns _Ifns;
        [Association("_Ifns", "IfnsCode", "IfnsCode")]
        public virtual Ifns Ifns
        {
            get
            {
                return this._Ifns;
            }
            set
            {
                this._Ifns = value;
            }
        }
        
        /// <summary>
        /// Конструктор
        /// </summary>
        public General()
        {
        }
    }
}