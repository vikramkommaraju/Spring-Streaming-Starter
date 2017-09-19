package com.streaming.demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.streaming.demo.model.ApiEventEntity;

public interface ApiEventRepository extends CrudRepository<ApiEventEntity, String> {

}
