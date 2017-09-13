package com.streaming.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.streaming.demo.model.DebugLog;

@RepositoryRestResource(collectionResourceRel = "debug", path = "debug")
public interface DebugLogRepository extends CrudRepository<DebugLog, Long> {

}