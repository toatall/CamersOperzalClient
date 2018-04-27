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
    [Table("camers_operzal_configuration")]
    public class Configuration
    {

        /// <summary>
        /// Идентификатор
        /// </summary>
        private string _ConfigId;
        [Column("config_id"), Key()]
        public string ConfigId
        {
            get
            {
                return this._ConfigId;
            }
            set
            {
                this._ConfigId = value;
            }
        }

        /// <summary>
        /// Значение
        /// </summary>
        private string _ConfigValue;
        [Column("config_value")]
        public string ConfigValue
        {
            get
            {
                return this._ConfigValue;
            }
            set
            {
                this._ConfigValue = value;
            }
        }

        /// <summary>
        /// Описание
        /// </summary>
        private string _ConfigDescription;
        [Column("config_description")]
        public string ConfigDescription
        {
            get
            {
                return this._ConfigDescription;
            }
            set
            {
                this._ConfigDescription = value;
            }
        }

        public Configuration()
        {

        }


    }
}