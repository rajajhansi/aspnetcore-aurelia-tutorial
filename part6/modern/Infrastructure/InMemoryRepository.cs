using System;
using System.Collections.Generic;
using System.Linq;
using Modern.Models;
namespace Modern.Infrastructure
{
    public class InMemoryRepository<T, TKey> : IGenericRepository<T, TKey> where T :  IEntity<TKey> where TKey : IComparable
    {
        protected List<T> DbSet;
        
        public T Get(TKey id)
        {
            return DbSet.Find((item) => (item.Id.CompareTo(id) == 0));
        }

        public IQueryable<T> GetAll()
        {
            return DbSet.AsQueryable();
        } 
        public virtual void Add(T entity)
        {
            DbSet.Add(entity);
        }
        public virtual void Delete(TKey id) 
        {
            DbSet.Remove(this.Get(id));
        }
        public virtual void Edit(T entity)
        {
            var entityIndex = DbSet.FindIndex((c) => c.Id.CompareTo(entity.Id) == 0);
            if(entityIndex >= 0)
            {
                DbSet[entityIndex] = entity;
            }
        }
        public virtual void Save(T entity)
        {
            Edit(entity);
        }
        public virtual void Dispose()
        {

        }
        public virtual T[] Search(string keyword)
        {
            throw new NotImplementedException("Search must be implemented by the derived class");
        }
    }
}