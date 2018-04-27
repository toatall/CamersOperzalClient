using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Data.Linq;
//using System.Data.Linq.Mapping;
using System.Data.Entity;


namespace CamersOperzalClient.Models
{
    /// <summary>
    /// Контекст
    /// </summary>
    public class ContextDatabase: DbContext
    {
        
        /// <summary>
        /// Конструктор
        /// </summary>
        public ContextDatabase()
            : base("SERVICESConnectionString")

        {
        }
        
        /// <summary>
        /// Данные из таблицы camers_operzal_ifns
        /// с информацией о Инспекциях
        /// </summary>
        /// <returns></returns>
        public virtual DbSet<Ifns> TableIfns { get; set; }        
        
        /// <summary>
        /// Данные из таблицы camers_operzal_general
        /// с информацией о камерах
        /// </summary>
        /// <returns></returns>
        public virtual DbSet<General> TableGeneral { get; set; }

        /// <summary>
        /// Данные из таблицы camers_operzal_configuration
        /// с информацией о настройках
        /// </summary>
        public virtual DbSet<Configuration> TableConfiguration { get; set; }

        /// <summary>
        /// Запись информации о посещении пользователем страницы с просмотром изображения с камеры
        /// </summary>
        /// <param name="SessionId">Идентификатор сесии</param>
        /// <param name="ClientIp">IP адрес клиента</param>
        /// <param name="CameraId">Идентификатор камеры</param>
        /// <param name="CameraIfns">Код Инспекции</param>
        /// <param name="UserAgent">Строка браузера пользователя</param>
        /// <returns></returns>
        public int VisitUserLog(string SessionId, string ClientIp, int CameraId, string CameraIfns, string UserAgent)
        {
            return this.Database.ExecuteSqlCommand("exec camers_operzal_visit_user {0}, {1}, {2}, {3}, {4}", 
                SessionId, ClientIp, CameraId, CameraIfns, UserAgent);
        }

    }
}