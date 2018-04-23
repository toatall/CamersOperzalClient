using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CamersOperzalClient.Models
{
    /// <summary>
    /// Описание Инспекции
    /// </summary>
    [Table("camers_operzal_ifns")]
    public class Ifns
    {
        
        /// <summary>
        /// Код Инспекции
        /// </summary>
        private string _IfnsCode;
        [Column("ifns_cod"), Key()]
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
        /// Наименование Инспекции
        /// </summary>
        private string _IfnsName;
        [Column("ifns_name")]
        public string IfnsName 
        {
            get 
            {
                return this._IfnsName;
            }
            set
            {
                this._IfnsName = value;
            }
        }

        /// <summary>
        /// Порядок сортировки
        /// </summary>
        private int _Order;
        [Column("order")]
        public int Order 
        {
            get
            {
                return this._Order;
            }
            set
            {
                this._Order = value;
            }
        }

        /// <summary>
        /// Камеры текущей Инспекции
        /// </summary>
        private ICollection<General> _Generals;
        [Association("_Generals", "IfnsCode", "IfnsCode")]
        public virtual ICollection<General> Generals
        {
            get
            {
                return this._Generals;
            }
            set
            {
                this._Generals = value;
            }
        }

        /// <summary>
        /// Приведение текущих камер от EntitySet к IEnumerable
        /// </summary>
        /// <returns></returns>
        public IEnumerable<General> NumerableGeneral()
        {
            return this.Generals;
        }

        /// <summary>
        /// Конструктор
        /// </summary>
        public Ifns()
        {
            this._Generals = new HashSet<General>();
        }
        
    }
}