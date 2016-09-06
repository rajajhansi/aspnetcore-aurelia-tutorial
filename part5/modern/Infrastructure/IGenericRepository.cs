using System;
using System.Linq;
using Modern.Models;
namespace Modern.Infrastructure
{
    public interface IGenericRepository<T, TKey> : IDisposable where T :  IEntity<TKey> where TKey : IComparable
    {
        T Get(TKey id);        
        IQueryable<T> GetAll();
        void Add(T entity);
        void Delete(TKey id);
        void Edit(T entity);
        void Save(T entity);
        T[] Search(string keyword);
    }
}